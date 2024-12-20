import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from './use-auth'
import { PracticeMode, DisplayMode, PracticeSettings } from '@/lib/types/practice'

const DEFAULT_SETTINGS: PracticeSettings = {
  practiceMode: 'guided',
  displayMode: 'en_to_en'
}

export function usePracticeSettings() {
  const { user } = useAuth()
  const [settings, setSettings] = useState<PracticeSettings>(DEFAULT_SETTINGS)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function initializeSettings() {
      if (!user) return

      try {
        // Try to get existing settings
        const { data: existingSettings, error: fetchError } = await supabase
          .from('user_practice_settings')
          .select('practice_mode, display_mode')
          .eq('user_id', user.id)
          .maybeSingle()

        if (fetchError) throw fetchError

        // If no settings exist, create default settings
        if (!existingSettings) {
          const { error: insertError } = await supabase
            .from('user_practice_settings')
            .insert({
              user_id: user.id,
              practice_mode: DEFAULT_SETTINGS.practiceMode,
              display_mode: DEFAULT_SETTINGS.displayMode
            })

          if (insertError) throw insertError
          setSettings(DEFAULT_SETTINGS)
        } else {
          setSettings({
            practiceMode: existingSettings.practice_mode as PracticeMode,
            displayMode: existingSettings.display_mode as DisplayMode
          })
        }
      } catch (error) {
        console.error('Error initializing practice settings:', error)
      } finally {
        setLoading(false)
      }
    }

    initializeSettings()
  }, [user])

  const updateSettings = async (newSettings: Partial<PracticeSettings>) => {
    if (!user) return

    try {
      const { error } = await supabase
        .from('user_practice_settings')
        .update({
          practice_mode: newSettings.practiceMode || settings.practiceMode,
          display_mode: newSettings.displayMode || settings.displayMode,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', user.id)

      if (error) throw error

      setSettings(prev => ({ ...prev, ...newSettings }))
    } catch (error) {
      console.error('Error updating practice settings:', error)
      throw error
    }
  }

  return {
    settings,
    updateSettings,
    loading
  }
}