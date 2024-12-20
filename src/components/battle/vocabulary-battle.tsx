import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Loader2 } from 'lucide-react'
import { BattleHeader } from './battle-header'
import { BattleProgress } from './battle-progress'
import { BattleCard } from './battle-card'
import { BattleOptions } from './battle-options'
import { BattleScore } from './battle-score'
import { BattleStreak } from './battle-streak'
import { BattleStats } from './battle-stats'
import { BattleResults } from './battle-results'
import { useVocabBattle } from '@/hooks/use-vocab-battle'
import { usePracticeSettings } from '@/hooks/use-practice-settings'
import { BATTLE_CONFIG } from '@/lib/utils/battle'

export function VocabularyBattle() {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null)
  const { settings } = usePracticeSettings()
  
  const { 
    currentWord,
    round,
    totalRounds,
    playerScore,
    opponentScore,
    timeLeft,
    checkAnswer,
    isGameOver,
    loading,
    streak,
    correctAnswers,
    maxStreak,
    resetBattle
  } = useVocabBattle(settings)

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer)
    setFeedback(answer === currentWord?.definition ? 'correct' : 'incorrect')
    checkAnswer(answer)
    
    setTimeout(() => {
      setSelectedAnswer(null)
      setFeedback(null)
    }, BATTLE_CONFIG.ANSWER_DELAY)
  }

  const handleContinue = () => {
    resetBattle()
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <BattleHeader />
      
      <Card className="mt-8 p-6">
        <BattleScore
          playerScore={playerScore}
          opponentScore={opponentScore}
        />

        {!isGameOver ? (
          <>
            <BattleProgress 
              round={round} 
              totalRounds={totalRounds} 
              timeLeft={timeLeft}
            />

            <BattleStreak 
              streak={streak} 
              threshold={BATTLE_CONFIG.STREAK_THRESHOLD} 
            />
            
            {currentWord && (
              <BattleCard
                word={currentWord.word}
                selected={selectedAnswer}
                feedback={feedback}
              >
                <BattleOptions
                  options={currentWord.options}
                  correctAnswer={currentWord.definition}
                  selected={selectedAnswer}
                  timeLeft={timeLeft}
                  onSelect={handleAnswer}
                />
              </BattleCard>
            )}
          </>
        ) : (
          <div className="space-y-8">
            <BattleResults
              playerScore={playerScore}
              opponentScore={opponentScore}
              accuracy={Math.round((correctAnswers / BATTLE_CONFIG.TOTAL_ROUNDS) * 100)}
              maxStreak={maxStreak}
              onPlayAgain={handleContinue}
              onContinue={handleContinue}
            />
            <BattleStats />
          </div>
        )}
      </Card>
    </div>
  )
}