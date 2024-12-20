import { useState, useEffect, useCallback } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from './use-auth'
import { AVATAR_STYLES } from '@/lib/constants/avatars'

export function useAvatar() {
  const { user } = useAuth()
  const [avatarStyle, setAvatarStyle] = useState('avataaars')
  const [loading, setLoading] = useState(true)

  // Fetch avatar settings
  useEffect(() => {
    async function fetchAvatarSettings() {
      if (!user) return

      try {
        const { data, error } = await supabase
          .from('user_avatar_settings')
          .select('avatar_style')
          .eq('user_id', user.id)
          .single()

        if (error) {
          console.error('Error fetching avatar style:', error)
          return
        }

        if (data?.avatar_style) {
          setAvatarStyle(data.avatar_style)
        }
      } catch (error) {
        console.error('Error fetching avatar settings:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchAvatarSettings()
  }, [user])

  const updateAvatarStyle = useCallback(async (style: string) => {
    if (!user) return

    try {
      setLoading(true)
      
      const { error } = await supabase
        .from('user_avatar_settings')
        .update({ avatar_style: style })
        .eq('user_id', user.id)

      if (error) throw error
      setAvatarStyle(style)
    } catch (error) {
      console.error('Error updating avatar style:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }, [user])

  const getAvatarUrl = useCallback((seed: string, style?: string) => {
    const selectedStyle = AVATAR_STYLES.find(s => s.id === (style || avatarStyle))
    return selectedStyle?.preview(seed) || AVATAR_STYLES[0].preview(seed)
  }, [avatarStyle])

  return {
    avatarStyle,
    updateAvatarStyle,
    getAvatarUrl,
    loading
  }
}