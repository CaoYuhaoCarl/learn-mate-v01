import { BATTLE_CONFIG } from './battle'
import { playSound } from '../sounds'

// Calculate score for a round
export function calculateScore(isCorrect: boolean, timeLeft: number): number {
  if (!isCorrect) return 0
  // Base score of 1 plus time bonus, rounded to ensure integer
  return Math.round(1 + (timeLeft / BATTLE_CONFIG.TIME_PER_ROUND) * 0.5)
}

// Calculate fragment rewards with streak bonuses
export function calculateFragmentReward(streak: number): number {
  // Ensure we return integers for database compatibility
  if (streak >= 10) return BATTLE_CONFIG.FRAGMENTS.STREAK_10_BONUS
  if (streak >= 5) return BATTLE_CONFIG.FRAGMENTS.STREAK_5_BONUS
  if (streak >= 3) return BATTLE_CONFIG.FRAGMENTS.STREAK_3_BONUS
  return BATTLE_CONFIG.FRAGMENTS.BASE_REWARD
}

// Handle correct answer feedback
export function handleCorrectAnswer(streak: number) {
  // Play streak sound for 3+ streak, otherwise normal correct sound
  if (streak >= BATTLE_CONFIG.STREAK_THRESHOLD) {
    playSound('streak', 0.5)
  } else {
    playSound('correct', 0.4)
  }
}

// Handle wrong answer feedback
export function handleWrongAnswer() {
  playSound('wrong', 0.3)
}

// Generate AI opponent score
export function generateAIScore(): number {
  const isCorrect = Math.random() < 0.7 // 70% chance of correct answer
  if (!isCorrect) return 0
  
  // Random time bonus between 0-0.5, rounded to ensure integer
  return Math.round(1 + Math.random() * 0.5)
}