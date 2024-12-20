import { VocabularyWord } from '@/lib/services/vocabulary'
import { SaveToNotebook } from '../notebook/save-to-notebook'
import { Card } from '../ui/card'
import { Loader2 } from 'lucide-react'

interface VocabularyListProps {
  words: VocabularyWord[]
  materialId: string
  loading?: boolean
}

export function VocabularyList({ words, materialId, loading }: VocabularyListProps) {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    )
  }

  if (!words.length) {
    return null
  }

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Words to Learn</h3>
          <span className="text-sm text-muted-foreground">
            {words.length} word{words.length !== 1 ? 's' : ''}
          </span>
        </div>
        <div className="grid gap-3">
          {words.map((word) => (
            <div
              key={word.word}
              className="group relative bg-white rounded-lg border shadow-sm hover:shadow-md transition-all duration-200"
            >
              <div className="p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{word.word}</p>
                      <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                        Level {word.level}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {word.definition}
                    </p>
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <SaveToNotebook
                      content={word.word}
                      type="vocabulary"
                      sourceId={materialId}
                      definition={word.definition}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}