import { Progress } from '@/components/ui/progress'

interface BattleProgressProps {
  round: number
  totalRounds: number
  timeLeft: number
}

export function BattleProgress({ round, totalRounds, timeLeft }: BattleProgressProps) {
  return (
    <div className="space-y-4 mb-8">
      <div className="flex justify-between text-sm">
        <span>Round {round} of {totalRounds}</span>
        <span>{Math.ceil(timeLeft)}s</span>
      </div>
      <Progress value={(round / totalRounds) * 100} />
      <Progress value={(timeLeft / 10) * 100} className="h-1" />
    </div>
  )
}