// Battle game constants
export const BATTLE_CONFIG = {
  TOTAL_ROUNDS: 10,
  TIME_PER_ROUND: 10,
  STREAK_THRESHOLD: 3,
  ANSWER_DELAY: 1000,
  PRACTICE_MODES: {
    VOCABULARY: 'vocabulary',
    NOTEBOOK: 'notebook'
  },
  FRAGMENTS: {
    BASE_REWARD: 1,
    STREAK_3_BONUS: 2,
    STREAK_5_BONUS: 5,
    STREAK_10_BONUS: 10
  }
} as const

// Generate random options for word definitions
export function generateOptions(correct: string, allDefinitions: string[]): string[] {
  const options = new Set<string>([correct])
  const availableDefinitions = allDefinitions.filter(def => def !== correct)
  
  while (options.size < 4 && availableDefinitions.length > 0) {
    const randomIndex = Math.floor(Math.random() * availableDefinitions.length)
    options.add(availableDefinitions[randomIndex])
    availableDefinitions.splice(randomIndex, 1)
  }
  
  return Array.from(options).sort(() => Math.random() - 0.5)
}

// Calculate fragment rewards based on streak
export function calculateFragmentReward(streak: number): number {
  if (streak >= 10) return BATTLE_CONFIG.FRAGMENTS.STREAK_10_BONUS
  if (streak >= 5) return BATTLE_CONFIG.FRAGMENTS.STREAK_5_BONUS
  if (streak >= 3) return BATTLE_CONFIG.FRAGMENTS.STREAK_3_BONUS
  return BATTLE_CONFIG.FRAGMENTS.BASE_REWARD
}