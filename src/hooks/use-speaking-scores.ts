import { useCallback } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/hooks/use-auth'

interface SaveScoreParams {
  materialId: string
  sentence: string
  spokenText: string
  score: number
}

export function useSpeakingScores() {
  const { user } = useAuth()

  const saveScore = useCallback(async ({ 
    materialId, 
    sentence, 
    spokenText, 
    score 
  }: SaveScoreParams) => {
    if (!user) {
      throw new Error('User must be authenticated to save scores')
    }

    try {
      const { error } = await supabase
        .from('speaking_scores')
        .insert({
          user_id: user.id,
          material_id: materialId,
          sentence,
          spoken_text: spokenText,
          score
        })

      if (error) throw error
    } catch (error) {
      console.error('Error saving speaking score:', error)
      throw error
    }
  }, [user])

  return { saveScore }
}