import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface BattleCardProps {
  word: string
  selected: string | null
  feedback: 'correct' | 'incorrect' | null
  children: React.ReactNode
}

export function BattleCard({ word, selected, feedback, children }: BattleCardProps) {
  return (
    <Card className={cn(
      "p-6 transition-colors duration-300",
      feedback === 'correct' && "bg-green-50 border-green-200",
      feedback === 'incorrect' && "bg-red-50 border-red-200"
    )}>
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold">{word}</h2>
        <p className="text-sm text-muted-foreground">/pronunciation/</p>
      </div>
      <CardContent className="mt-4">
        {children}
      </CardContent>
    </Card>
  )
}