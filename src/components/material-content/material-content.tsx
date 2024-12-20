import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, CheckCircle } from 'lucide-react'
import { Material } from '@/lib/types/material'
import { useMaterialProgress } from '@/hooks/use-material-progress'
import { TTSControls } from '@/components/ui/tts-controls'
import { ContentRenderer } from './content-renderer'
import { useTextSelection } from '@/hooks/use-text-selection'
import { SelectionPopover } from '../selection/selection-popover'

interface MaterialContentProps {
  material: Material
  onBack: () => void
}

export function MaterialContent({ material, onBack }: MaterialContentProps) {
  const { checkProgress, updateProgress } = useMaterialProgress()
  const [completed, setCompleted] = useState(false)
  const { selection, clearSelection, handleSelectionStart, handleSelectionEnd } = useTextSelection()

  useEffect(() => {
    async function loadProgress() {
      const isCompleted = await checkProgress(material.id)
      setCompleted(isCompleted)
    }
    loadProgress()
  }, [material.id, checkProgress])

  return (
    <Card>
      <CardHeader className="space-y-4">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            className="w-fit -ml-2"
            onClick={onBack}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Materials
          </Button>
          <TTSControls text={material.content} />
        </div>
        <CardTitle>{material.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        <div 
          onMouseDown={handleSelectionStart}
          onMouseUp={handleSelectionEnd}
          className="selection:bg-primary/20"
        >
          {material.content_sections.map((section, index) => (
            <ContentRenderer
              key={index}
              section={section}
            />
          ))}
        </div>

        {selection && (
          <SelectionPopover
            text={selection.text}
            type={selection.type}
            position={selection.position}
            sourceId={material.id}
            context={selection.context}
            onClose={clearSelection}
          />
        )}

        <div className="flex justify-end">
          <Button
            onClick={() => updateProgress(material.id, true)}
            disabled={completed}
            className="gap-2"
          >
            {completed ? (
              <>
                <CheckCircle className="h-4 w-4" />
                Completed
              </>
            ) : (
              'Mark as Complete'
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}