import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface WordChallengeProps {
  word: {
    word: string
    definition: string
    options: string[]
  }
  onAnswer: (answer: string) => void
  timeLeft: number
}

export function WordChallenge({ word, onAnswer, timeLeft }: WordChallengeProps) {
  const [selected, setSelected] = useState<string | null>(null)
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null)

  const handleAnswer = (option: string) => {
    setSelected(option)
    const isCorrect = option === word.definition
    setFeedback(isCorrect ? 'correct' : 'incorrect')
    onAnswer(option)

    // Reset feedback after animation
    setTimeout(() => {
      setSelected(null)
      setFeedback(null)
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <Card className={cn(
        "p-6 transition-colors duration-300",
        feedback === 'correct' && "bg-green-50 border-green-200",
        feedback === 'incorrect' && "bg-red-50 border-red-200"
      )}>
        <h2 className="text-3xl font-bold text-center mb-2">{word.word}</h2>
        <p className="text-sm text-center text-muted-foreground">/pronunciation/</p>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {word.options.map((option) => (
          <Button
            key={option}
            variant={selected === option 
              ? option === word.definition 
                ? "default" 
                : "destructive"
              : "outline"
            }
            className={cn(
              "p-6 h-auto text-left transition-all",
              selected === option && option === word.definition && "ring-2 ring-green-500",
              selected === option && option !== word.definition && "ring-2 ring-red-500"
            )}
            onClick={() => handleAnswer(option)}
            disabled={timeLeft === 0 || selected !== null}
          >
            {option}
          </Button>
        ))}
      </div>
    </div>
  )
}