import { useEffect } from 'react'
import confetti from 'canvas-confetti'
import { Trophy } from 'lucide-react'

interface BattleStreakProps {
  streak: number
  threshold: number
}

export function BattleStreak({ streak, threshold }: BattleStreakProps) {
  useEffect(() => {
    if (streak >= threshold) {
      const end = Date.now() + 3000
      const colors = ['#4b8c50', '#69a76e', '#98c69c']

      const frame = () => {
        confetti({
          particleCount: 2,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors
        })
        confetti({
          particleCount: 2,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors
        })

        if (Date.now() < end) {
          requestAnimationFrame(frame)
        }
      }

      frame()
    }
  }, [streak, threshold])

  if (streak === 0) return null

  return (
    <div className="flex items-center justify-center gap-2 text-primary">
      <Trophy className="h-5 w-5" />
      <span className="font-medium">Streak: {streak}</span>
    </div>
  )
}