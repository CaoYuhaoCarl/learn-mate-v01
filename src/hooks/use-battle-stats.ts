import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from './use-auth'

export interface BattleStats {
  dates: string[]
  scores: number[]
  opponentScores: number[]
  winRate: number
  averageScore: number
  totalGames: number
  bestScore: number
}

export function useBattleStats() {
  const { user } = useAuth()
  const [stats, setStats] = useState<BattleStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchStats() {
      if (!user) return

      try {
        const { data, error } = await supabase
          .from('battle_history')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: true })

        if (error) throw error

        if (data) {
          const dates = data.map(battle => 
            new Date(battle.created_at).toLocaleDateString()
          )
          const scores = data.map(battle => battle.score)
          const opponentScores = data.map(battle => battle.opponent_score)
          
          const wins = data.filter(battle => battle.score > battle.opponent_score).length
          const winRate = (wins / data.length) * 100
          const averageScore = scores.reduce((a, b) => a + b, 0) / scores.length
          const bestScore = Math.max(...scores)

          setStats({
            dates,
            scores,
            opponentScores,
            winRate,
            averageScore,
            totalGames: data.length,
            bestScore
          })
        }
      } catch (error) {
        console.error('Error fetching battle stats:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [user])

  return { stats, loading }
}