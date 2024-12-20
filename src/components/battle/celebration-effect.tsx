import { useEffect } from 'react'
import confetti from 'canvas-confetti'

interface CelebrationEffectProps {
  duration?: number
}

export function CelebrationEffect({ duration = 3000 }: CelebrationEffectProps) {
  useEffect(() => {
    const end = Date.now() + duration

    const frame = () => {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#4b8c50', '#69a76e', '#98c69c']
      })
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#4b8c50', '#69a76e', '#98c69c']
      })

      if (Date.now() < end) {
        requestAnimationFrame(frame)
      }
    }

    frame()
  }, [duration])

  return null
}