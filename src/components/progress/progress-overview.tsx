import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Trophy, Target, Brain, Clock } from 'lucide-react'
import { StatsCard } from './stats-card'
import { useProgress } from '@/hooks/use-progress'

export function ProgressOverview() {
  const { stats } = useProgress()
  
  if (!stats) return null

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatsCard
        title="Total Progress"
        value={`${stats.totalProgress}%`}
        description="Overall completion rate"
        icon={Trophy}
        trend={stats.progressTrend}
      />
      <StatsCard
        title="Study Streak"
        value={`${stats.currentStreak} days`}
        description={`Best: ${stats.bestStreak} days`}
        icon={Target}
        trend={stats.streakTrend}
      />
      <StatsCard
        title="Words Mastered"
        value={stats.masteredWords}
        description="Vocabulary progress"
        icon={Brain}
        trend={stats.vocabularyTrend}
      />
      <StatsCard
        title="Study Time"
        value={`${stats.totalHours}h`}
        description="Total learning time"
        icon={Clock}
        trend={stats.timeTrend}
      />
    </div>
  )
}