import { useState, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Mic, Volume2, RefreshCw } from 'lucide-react'
import { useSpeechRecognition } from '@/hooks/use-speech-recognition'
import { useTTS } from '@/hooks/use-tts'
import { useSpeakingScores } from '@/hooks/use-speaking-scores'

interface SpeakingPracticeProps {
  text: string
  materialId: string
  onScore?: (score: number) => void
}

export function SpeakingPractice({ text, materialId, onScore }: SpeakingPracticeProps) {
  const { start, stop, isListening, results } = useSpeechRecognition()
  const { speak, speaking } = useTTS()
  const { saveScore } = useSpeakingScores()
  const [score, setScore] = useState<number | null>(null)
  const [saving, setSaving] = useState(false)

  const handleListen = useCallback(() => {
    if (isListening) {
      stop()
    } else {
      setScore(null)
      start()
    }
  }, [isListening, start, stop])

  const calculateScore = useCallback((original: string, spoken: string) => {
    const originalWords = original.toLowerCase().split(' ')
    const spokenWords = spoken.toLowerCase().split(' ')
    
    let matches = 0
    spokenWords.forEach(word => {
      if (originalWords.includes(word)) matches++
    })
    
    return Math.round((matches / originalWords.length) * 100)
  }, [])

  const handleResults = useCallback(async () => {
    if (results.length > 0) {
      const spokenText = results[0].transcript
      const accuracyScore = calculateScore(text, spokenText)
      setScore(accuracyScore)

      try {
        setSaving(true)
        await saveScore({
          materialId,
          sentence: text,
          spokenText,
          score: accuracyScore
        })

        if (onScore) {
          onScore(accuracyScore)
        }
      } catch (error) {
        console.error('Failed to save score:', error)
      } finally {
        setSaving(false)
      }
    }
  }, [results, text, materialId, calculateScore, saveScore, onScore])

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle className="text-lg">Speaking Practice</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-4 bg-muted rounded-lg">
          <p className="font-medium">{text}</p>
        </div>
        
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => speak(text)}
            disabled={speaking || isListening}
          >
            <Volume2 className="h-4 w-4 mr-2" />
            Listen First
          </Button>
          
          <Button
            variant={isListening ? "destructive" : "default"}
            onClick={handleListen}
          >
            <Mic className="h-4 w-4 mr-2" />
            {isListening ? "Stop Recording" : "Start Speaking"}
          </Button>

          <Button
            variant="outline"
            onClick={handleResults}
            disabled={results.length === 0 || saving}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${saving ? 'animate-spin' : ''}`} />
            {saving ? 'Saving...' : 'Check Pronunciation'}
          </Button>
        </div>

        {score !== null && (
          <div className={`p-4 rounded-lg ${
            score >= 80 ? 'bg-green-100' : 'bg-yellow-100'
          }`}>
            <p className="font-medium">
              Pronunciation Score: {score}%
              {score >= 80 ? ' - Excellent!' : ' - Keep practicing!'}
            </p>
            {results[0] && (
              <p className="text-sm mt-2">
                You said: "{results[0].transcript}"
              </p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}