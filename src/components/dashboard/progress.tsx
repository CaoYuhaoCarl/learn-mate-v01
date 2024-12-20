import { ProgressOverview } from '../progress/progress-overview'
import { LearningChart } from '../progress/learning-chart'
import { SkillRadar } from '../progress/skill-radar'
import { useProgress } from '@/hooks/use-progress'

export function Progress() {
  const { chartData, radarData } = useProgress()

  return (
    <div className="space-y-6">
      <ProgressOverview />
      
      <div className="grid gap-6 md:grid-cols-2">
        <LearningChart data={chartData} />
        <SkillRadar data={radarData} />
      </div>
    </div>
  )
}