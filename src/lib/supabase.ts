import { createClient } from '@supabase/supabase-js'

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
    fetch: fetch.bind(globalThis)
  }
})

// Add error handling for failed requests
supabase.handleError = (error: any) => {
  console.error('Supabase error:', error)
  if (error.message === 'Failed to fetch') {
    return new Error('Network error - please check your connection')
  }
  return error
}