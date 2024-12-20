import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Trophy, Target, Brain, ArrowRight } from 'lucide-react'
import { FragmentsDisplay } from '../fragments/fragments-display'

interface BattleResultsProps {
  playerScore: number
  opponentScore: number
  accuracy: number
  maxStreak: number
  onPlayAgain: () => void
  onContinue: () => void
}

export function BattleResults({ 
  playerScore, 
  opponentScore, 
  accuracy, 
  maxStreak,
  onPlayAgain,
  onContinue
}: BattleResultsProps) {
  const isWinner = playerScore > opponentScore

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center">
          {isWinner ? 'Victory!' : playerScore === opponentScore ? 'It\'s a Tie!' : 'Good Try!'}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Score Display */}
        <div className="text-center space-y-2">
          <div className="text-4xl font-bold">
            {playerScore} - {opponentScore}
          </div>
          <FragmentsDisplay className="justify-center" />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center space-y-1">
            <Trophy className="h-5 w-5 mx-auto text-primary" />
            <div className="text-lg font-semibold">{accuracy}%</div>
            <div className="text-xs text-muted-foreground">Accuracy</div>
          </div>
          <div className="text-center space-y-1">
            <Target className="h-5 w-5 mx-auto text-primary" />
            <div className="text-lg font-semibold">{maxStreak}</div>
            <div className="text-xs text-muted-foreground">Best Streak</div>
          </div>
          <div className="text-center space-y-1">
            <Brain className="h-5 w-5 mx-auto text-primary" />
            <div className="text-lg font-semibold">{playerScore}</div>
            <div className="text-xs text-muted-foreground">Correct</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button 
            variant="outline"
            className="flex-1" 
            onClick={onPlayAgain}
          >
            Play Again
          </Button>
          <Button 
            className="flex-1" 
            onClick={onContinue}
          >
            Continue
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}