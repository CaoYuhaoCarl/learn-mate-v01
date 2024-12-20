import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from './use-auth'

export function useNickname() {
  const { user } = useAuth()
  const [nickname, setNickname] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchNickname() {
      if (!user) return

      try {
        const { data, error } = await supabase
          .from('user_avatar_settings')
          .select('nickname')
          .eq('user_id', user.id)
          .single()

        if (error) throw error
        
        // Set nickname or fallback to email username
        setNickname(data?.nickname || user.email?.split('@')[0] || 'User')
      } catch (error) {
        console.error('Error fetching nickname:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchNickname()
  }, [user])

  const updateNickname = async (newNickname: string) => {
    if (!user) return

    try {
      setLoading(true)
      const { error } = await supabase
        .from('user_avatar_settings')
        .update({ nickname: newNickname })
        .eq('user_id', user.id)

      if (error) throw error
      setNickname(newNickname)
    } catch (error) {
      console.error('Error updating nickname:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  return {
    nickname,
    updateNickname,
    loading
  }
}