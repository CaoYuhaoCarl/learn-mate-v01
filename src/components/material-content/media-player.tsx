import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Play, Pause, Volume2, VolumeX } from 'lucide-react'

interface MediaPlayerProps {
  type: 'video' | 'audio'
  src: string
  poster?: string
  title?: string
}

export function MediaPlayer({ type, src, poster, title }: MediaPlayerProps) {
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(false)

  const MediaElement = type === 'video' ? 'video' : 'audio'

  return (
    <Card className="overflow-hidden">
      <MediaElement
        src={src}
        poster={poster}
        className="w-full"
        controls
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onVolumeChange={(e: any) => setMuted(e.target.muted)}
      />
      
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              const media = document.querySelector(`${MediaElement}`) as HTMLMediaElement
              if (media) {
                playing ? media.pause() : media.play()
              }
            }}
          >
            {playing ? (
              <Pause className="h-4 w-4" />
            ) : (
              <Play className="h-4 w-4" />
            )}
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              const media = document.querySelector(`${MediaElement}`) as HTMLMediaElement
              if (media) {
                media.muted = !muted
              }
            }}
          >
            {muted ? (
              <VolumeX className="h-4 w-4" />
            ) : (
              <Volume2 className="h-4 w-4" />
            )}
          </Button>
        </div>

        {title && (
          <span className="text-sm text-muted-foreground">
            {title}
          </span>
        )}
      </div>
    </Card>
  )
}