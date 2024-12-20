import { useState, useCallback, useEffect } from 'react'

interface TTSOptions {
  rate?: number
  pitch?: number
  volume?: number
  lang?: string
}

export function useTTS() {
  const [speaking, setSpeaking] = useState(false)
  const [supported, setSupported] = useState(false)

  useEffect(() => {
    setSupported('speechSynthesis' in window)
  }, [])

  const speak = useCallback((text: string, options: TTSOptions = {}) => {
    if (!supported) return

    // Cancel any ongoing speech
    window.speechSynthesis.cancel()

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.rate = options.rate ?? 1
    utterance.pitch = options.pitch ?? 1
    utterance.volume = options.volume ?? 1
    utterance.lang = options.lang ?? 'en-US'

    utterance.onstart = () => setSpeaking(true)
    utterance.onend = () => setSpeaking(false)
    utterance.onerror = () => setSpeaking(false)

    window.speechSynthesis.speak(utterance)
  }, [supported])

  const stop = useCallback(() => {
    if (!supported) return
    window.speechSynthesis.cancel()
    setSpeaking(false)
  }, [supported])

  return {
    speak,
    stop,
    speaking,
    supported
  }
}