import { Button } from '@/components/ui/button'
import { Volume2, VolumeX } from 'lucide-react'
import { useTTS } from '@/hooks/use-tts'

interface TTSControlsProps {
  text: string
  className?: string
}

export function TTSControls({ text, className }: TTSControlsProps) {
  const { speak, stop, speaking, supported } = useTTS()

  if (!supported) return null

  return (
    <Button
      variant="outline"
      size="sm"
      className={className}
      onClick={() => speaking ? stop() : speak(text)}
    >
      {speaking ? (
        <>
          <VolumeX className="h-4 w-4 mr-2" />
          Stop Reading
        </>
      ) : (
        <>
          <Volume2 className="h-4 w-4 mr-2" />
          Read Aloud
        </>
      )}
    </Button>
  )
}