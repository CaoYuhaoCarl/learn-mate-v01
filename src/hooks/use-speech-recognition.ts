import { useState, useCallback, useEffect } from 'react'

interface SpeechRecognitionResult {
  transcript: string
  confidence: number
}

export function useSpeechRecognition() {
  const [isListening, setIsListening] = useState(false)
  const [supported, setSupported] = useState(false)
  const [results, setResults] = useState<SpeechRecognitionResult[]>([])

  useEffect(() => {
    setSupported('webkitSpeechRecognition' in window)
  }, [])

  const start = useCallback(() => {
    if (!supported) return

    const recognition = new (window as any).webkitSpeechRecognition()
    recognition.continuous = false
    recognition.interimResults = false
    recognition.lang = 'en-US'

    recognition.onstart = () => setIsListening(true)
    recognition.onend = () => setIsListening(false)
    
    recognition.onresult = (event: any) => {
      const results = Array.from(event.results).map((result: any) => ({
        transcript: result[0].transcript,
        confidence: result[0].confidence
      }))
      setResults(results)
    }

    recognition.start()

    return () => recognition.stop()
  }, [supported])

  const stop = useCallback(() => {
    setIsListening(false)
  }, [])

  return {
    start,
    stop,
    isListening,
    supported,
    results
  }
}