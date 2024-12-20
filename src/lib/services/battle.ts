import { supabase } from '@/lib/supabase'

export interface BattleHistoryEntry {
  user_id: string
  score: number
  opponent_score: number
  accuracy: number
  max_streak: number
  time_taken: number
}

// Helper to ensure integers for database
function ensureInteger(num: number): number {
  return Math.round(num)
}

export async function saveBattleHistory(entry: BattleHistoryEntry) {
  try {
    // Ensure all numeric values are properly rounded integers
    const formattedEntry = {
      ...entry,
      score: ensureInteger(entry.score),
      opponent_score: ensureInteger(entry.opponent_score),
      accuracy: ensureInteger(entry.accuracy),
      max_streak: ensureInteger(entry.max_streak),
      time_taken: ensureInteger(entry.time_taken)
    }

    const { error } = await supabase
      .from('battle_history')
      .insert(formattedEntry)

    if (error) {
      console.error('Battle history save error:', error)
      throw error
    }
  } catch (error) {
    console.error('Error saving battle history:', error)
    throw error
  }
}