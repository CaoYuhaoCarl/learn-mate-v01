import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface BattleOptionsProps {
  options: string[]
  correctAnswer: string
  selected: string | null
  timeLeft: number
  onSelect: (option: string) => void
}

export function BattleOptions({ 
  options = [], 
  correctAnswer, 
  selected, 
  timeLeft, 
  onSelect 
}: BattleOptionsProps) {
  // Early return with loading state if no options
  if (!Array.isArray(options) || options.length === 0) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div 
            key={i}
            className="h-24 rounded-lg bg-muted animate-pulse"
          />
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {options.map((option) => (
        <Button
          key={option}
          variant={selected === option 
            ? option === correctAnswer 
              ? "default" 
              : "destructive"
            : "outline"
          }
          className={cn(
            "p-6 h-auto text-left transition-all",
            selected === option && option === correctAnswer && "ring-2 ring-green-500",
            selected === option && option !== correctAnswer && "ring-2 ring-red-500"
          )}
          onClick={() => onSelect(option)}
          disabled={timeLeft === 0 || selected !== null}
        >
          {option}
        </Button>
      ))}
    </div>
  )
}