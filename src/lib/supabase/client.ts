import { createClient } from '@supabase/supabase-js'
import { retryWithBackoff } from './retry'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  },
  global: {
    headers: {
      'x-client-info': 'learnmate-web'
    },
    fetch: async (url, options) => {
      return retryWithBackoff(() => fetch(url, {
        ...options,
        credentials: 'include'
      }))
    }
  }
})

// Error handler helper
export function handleSupabaseError(error: any): Error {
  if (error.message === 'Failed to fetch') {
    return new Error('Network error - please check your connection')
  }
  if (error.code === 'PGRST301') {
    return new Error('Database row level security policy violation')
  }
  return error
}