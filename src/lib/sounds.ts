// Sound utility functions
const audioCache = new Map<string, HTMLAudioElement>()

// Sound URLs using reliable, short audio files
export const SOUNDS = {
  correct: 'https://assets.mixkit.co/sfx/preview/mixkit-correct-answer-tone-2870.mp3',
  wrong: 'https://assets.mixkit.co/sfx/preview/mixkit-wrong-answer-fail-notification-946.mp3',
  streak: 'https://assets.mixkit.co/sfx/preview/mixkit-achievement-bell-600.mp3',
  gameOver: 'https://assets.mixkit.co/sfx/preview/mixkit-game-over-trombone-1940.mp3'
} as const

// Preload all sounds
export const preloadSounds = () => {
  Object.entries(SOUNDS).forEach(([key, url]) => {
    if (!audioCache.has(key)) {
      const audio = new Audio(url)
      audio.preload = 'auto'
      audioCache.set(key, audio)
      audio.load()
    }
  })
}

// Play sound with better error handling
export const playSound = async (key: keyof typeof SOUNDS, volume = 1) => {
  try {
    let audio = audioCache.get(key)
    
    if (!audio) {
      audio = new Audio(SOUNDS[key])
      audio.preload = 'auto'
      audioCache.set(key, audio)
    }

    audio.currentTime = 0
    audio.volume = volume
    await audio.play()
  } catch (error) {
    console.warn('Failed to play sound:', error)
  }
}