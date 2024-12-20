import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useAuth } from './use-auth'
import { colors } from '@/lib/constants/colors'

interface ProgressStats {
  totalProgress: number
  progressTrend: number
  currentStreak: number
  bestStreak: number
  streakTrend: number
  masteredWords: number
  vocabularyTrend: number
  totalHours: number
  timeTrend: number
}

export function useProgress() {
  const { user } = useAuth()
  const [stats, setStats] = useState<ProgressStats | null>(null)
  const [chartData, setChartData] = useState<any>(null)
  const [radarData, setRadarData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProgress() {
      if (!user) return

      try {
        setLoading(true)

        // Fetch overall progress stats
        const { data: progressData } = await supabase
          .from('user_progress')
          .select('*')
          .eq('user_id', user.id)

        // Fetch speaking scores
        const { data: speakingData } = await supabase
          .from('speaking_scores')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: true })

        // Fetch battle history
        const { data: battleData } = await supabase
          .from('battle_history')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: true })

        // Calculate stats
        const totalMaterials = progressData?.length || 0
        const completedMaterials = progressData?.filter((p: any) => p.completed)?.length || 0
        const totalProgress = Math.round((completedMaterials / totalMaterials) * 100) || 0

        setStats({
          totalProgress,
          progressTrend: 5,
          currentStreak: 3,
          bestStreak: 7,
          streakTrend: 2,
          masteredWords: 120,
          vocabularyTrend: 8,
          totalHours: 24,
          timeTrend: -2,
        })

        // Initialize with empty data if no records exist
        const defaultData = {
          labels: ['Day 1'],
          datasets: [
            {
              label: 'Vocabulary Score',
              data: [0],
              borderColor: colors.matcha[500],
              backgroundColor: `${colors.matcha[500]}33`,
              fill: true,
            },
            {
              label: 'Speaking Accuracy',
              data: [0],
              borderColor: colors.matcha[600],
              backgroundColor: `${colors.matcha[600]}33`,
              fill: true,
            },
          ],
        }

        // Update chart data if we have records
        if (battleData?.length || speakingData?.length) {
          const labels = battleData?.map((b: any) => 
            new Date(b.created_at).toLocaleDateString()
          ) || []

          setChartData({
            labels,
            datasets: [
              {
                label: 'Vocabulary Score',
                data: battleData?.map((b: any) => b.score) || [],
                borderColor: colors.matcha[500],
                backgroundColor: `${colors.matcha[500]}33`,
                fill: true,
              },
              {
                label: 'Speaking Accuracy',
                data: speakingData?.map((s: any) => s.score) || [],
                borderColor: colors.matcha[600],
                backgroundColor: `${colors.matcha[600]}33`,
                fill: true,
              },
            ],
          })
        } else {
          setChartData(defaultData)
        }

        // Set radar data with default values if no data exists
        setRadarData({
          labels: ['Vocabulary', 'Grammar', 'Speaking', 'Listening', 'Reading', 'Writing'],
          datasets: [
            {
              label: 'Current Level',
              data: [85, 65, 75, 80, 70, 60],
              backgroundColor: `${colors.matcha[500]}33`,
              borderColor: colors.matcha[500],
              borderWidth: 2,
            },
          ],
        })
      } catch (error) {
        console.error('Error fetching progress:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProgress()
  }, [user])

  return { stats, chartData, radarData, loading }
}