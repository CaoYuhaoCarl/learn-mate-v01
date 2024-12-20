import { useState, useEffect, useCallback } from 'react'
import { useAuth } from './use-auth'
import { BATTLE_CONFIG } from '@/lib/utils/battle'
import { 
  calculateScore,
  calculateFragmentReward,
  handleCorrectAnswer,
  handleWrongAnswer,
  generateAIScore
} from '@/lib/utils/battle-scoring'
import { saveBattleHistory } from '@/lib/services/battle'
import { addKnowledgeFragments } from '@/lib/services/fragments'
import { playSound } from '@/lib/sounds'
import { PracticeSettings, VocabularyWord } from '@/lib/types/practice'
import { getVocabularyWords } from '@/lib/services/vocabulary'

interface BattleWord extends VocabularyWord {
  options: string[]
}

export function useVocabBattle(settings: PracticeSettings) {
  const { user } = useAuth()
  const [words, setWords] = useState<BattleWord[]>([])
  const [round, setRound] = useState(1)
  const [playerScore, setPlayerScore] = useState(0)
  const [opponentScore, setOpponentScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(BATTLE_CONFIG.TIME_PER_ROUND)
  const [currentWord, setCurrentWord] = useState<BattleWord | null>(null)
  const [isGameOver, setIsGameOver] = useState(false)
  const [loading, setLoading] = useState(true)
  const [streak, setStreak] = useState(0)
  const [maxStreak, setMaxStreak] = useState(0)
  const [startTime] = useState(Date.now())
  const [correctAnswers, setCorrectAnswers] = useState(0)

  const handleGameOver = useCallback(async () => {
    if (!user) return

    setIsGameOver(true)
    playSound('gameOver', 0.4)

    try {
      const accuracy = Math.round((correctAnswers / BATTLE_CONFIG.TOTAL_ROUNDS) * 100)
      const timeTaken = Math.floor((Date.now() - startTime) / 1000)

      await saveBattleHistory({
        user_id: user.id,
        score: Math.round(playerScore),
        opponent_score: Math.round(opponentScore),
        accuracy,
        max_streak: maxStreak,
        time_taken: timeTaken
      })

      const fragmentReward = calculateFragmentReward(maxStreak)
      await addKnowledgeFragments(user.id, fragmentReward, 'battle')
    } catch (error) {
      console.error('Error saving battle results:', error)
    }
  }, [user, playerScore, opponentScore, correctAnswers, maxStreak, startTime])

  const checkAnswer = useCallback((answer: string) => {
    if (!currentWord || isGameOver) return

    const isCorrect = answer === currentWord.definition
    
    if (isCorrect) {
      const roundScore = calculateScore(true, timeLeft)
      setPlayerScore(prev => prev + roundScore)
      setStreak(prev => {
        const newStreak = prev + 1
        setMaxStreak(Math.max(maxStreak, newStreak))
        return newStreak
      })
      setCorrectAnswers(prev => prev + 1)
      handleCorrectAnswer(streak + 1)
    } else {
      setStreak(0)
      handleWrongAnswer()
    }

    // AI opponent's turn
    const aiScore = generateAIScore()
    setOpponentScore(prev => prev + aiScore)

    if (round === BATTLE_CONFIG.TOTAL_ROUNDS) {
      handleGameOver()
    } else {
      setRound(prev => prev + 1)
      setTimeLeft(BATTLE_CONFIG.TIME_PER_ROUND)
      setCurrentWord(words[round])
    }
  }, [currentWord, isGameOver, timeLeft, round, words, streak, maxStreak, handleGameOver])

  // Initialize battle
  useEffect(() => {
    async function initBattle() {
      setLoading(true)
      try {
        const battleWords = await getVocabularyWords(BATTLE_CONFIG.TOTAL_ROUNDS)
        setWords(battleWords)
        setCurrentWord(battleWords[0])
      } catch (error) {
        console.error('Error initializing battle:', error)
      } finally {
        setLoading(false)
      }
    }

    initBattle()
  }, [settings])

  // Timer effect
  useEffect(() => {
    if (isGameOver || loading) return

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 0) {
          checkAnswer('')
          return BATTLE_CONFIG.TIME_PER_ROUND
        }
        return prev - 0.1
      })
    }, 100)

    return () => clearInterval(timer)
  }, [isGameOver, loading, checkAnswer])

  return {
    currentWord,
    round,
    totalRounds: BATTLE_CONFIG.TOTAL_ROUNDS,
    playerScore,
    opponentScore,
    timeLeft,
    checkAnswer,
    isGameOver,
    loading,
    streak,
    correctAnswers,
    maxStreak,
    resetBattle: () => window.location.reload()
  }
}