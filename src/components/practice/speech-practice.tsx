import { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Mic, Volume2, RefreshCw } from 'lucide-react'
import { useSpeechRecognition } from '@/hooks/use-speech-recognition'
import { useTTS } from '@/hooks/use-tts'
import { VocabularyWord } from '@/lib/types/practice'

interface SpeechPracticeProps {
  word: VocabularyWord
  displayMode: 'zh_to_speech' | 'en_to_speech'
  onResult: (correct: boolean, spokenText: string) => void
}

export function SpeechPractice({ 
  word, 
  displayMode,
  onResult 
}: SpeechPracticeProps) {
  const { start, stop, isListening, results } = useSpeechRecognition()
  const { speak, speaking } = useTTS()
  const [score, setScore] = useState<number | null>(null)

  const questionText = displayMode === 'zh_to_speech' 
    ? word.chinese_translation 
    : word.word

  const targetWord = word.word.toLowerCase()

  useEffect(() => {
    if (results.length > 0) {
      const spokenText = results[0].transcript.toLowerCase()
      const correct = spokenText.includes(targetWord)
      const accuracy = correct ? 100 : 0 // Simplified scoring
      setScore(accuracy)
      onResult(correct, spokenText)
    }
  }, [results, targetWord, onResult])

  return (
    <Card>
      <CardContent className="space-y-4 p-6">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold">{questionText}</h2>
          <p className="text-sm text-muted-foreground">
            Speak the {displayMode === 'zh_to_speech' ? 'English translation' : 'word'}
          </p>
        </div>

        <div className="flex justify-center gap-4">
          <Button
            variant="outline"
            onClick={() => speak(word.word)}
            disabled={speaking || isListening}
          >
            <Volume2 className="h-4 w-4 mr-2" />
            Listen
          </Button>
          
          <Button
            variant={isListening ? "destructive" : "default"}
            onClick={() => isListening ? stop() : start()}
          >
            <Mic className="h-4 w-4 mr-2" />
            {isListening ? "Stop" : "Start Speaking"}
          </Button>

          {score !== null && (
            <Button
              variant="outline"
              onClick={() => {
                setScore(null)
                start()
              }}
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Try Again
            </Button>
          )}
        </div>

        {score !== null && (
          <div className={`p-4 rounded-lg ${
            score >= 80 ? 'bg-green-100' : 'bg-yellow-100'
          }`}>
            <p className="font-medium">
              {score >= 80 ? 'Correct!' : 'Try again!'}
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