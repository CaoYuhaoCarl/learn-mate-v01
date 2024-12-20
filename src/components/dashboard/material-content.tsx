import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, CheckCircle } from 'lucide-react'
import { Material } from '@/hooks/use-materials'
import { useProgress } from '@/hooks/use-progress'
import { TTSControls } from '@/components/ui/tts-controls'
import { SpeakingPractice } from '@/components/practice/speaking-practice'
import { SaveToNotebook } from '@/components/notebook/save-to-notebook'
import { NotebookItemType } from '@/hooks/use-notebook'

interface MaterialContentProps {
  material: Material
  onBack: () => void
}

// Helper function to extract content sections
function extractSections(content: string) {
  const paragraphs = content.split('\n\n')
  return {
    vocabulary: paragraphs
      .find(p => p.includes('Vocabulary:'))
      ?.split('\n')
      .slice(1)
      .map(word => word.replace('- ', ''))
      .filter(Boolean) || [],
    sentences: paragraphs
      .filter(p => p.includes('Dialogue'))
      .flatMap(p => 
        p.split('\n')
          .filter(line => line.includes(':'))
          .map(line => line.split(':')[1].trim())
      ),
    grammar: paragraphs
      .find(p => p.includes('Key Points:') || p.includes('Key Concepts:'))
      ?.split('\n')
      .slice(1)
      .map(point => point.replace(/^\d+\.\s*|-\s*/, ''))
      .filter(Boolean) || []
  }
}

export function MaterialContent({ material, onBack }: MaterialContentProps) {
  const { checkProgress, updateProgress } = useProgress()
  const [completed, setCompleted] = useState(false)
  const [practiceScores, setPracticeScores] = useState<Record<number, number>>({})

  const sections = extractSections(material.content)
  const practiceSentences = material.content
    .split('\n')
    .filter(line => line.trim().length > 0 && line.trim().length < 100)
    .slice(0, 3)

  const allPracticesCompleted = practiceSentences.length > 0 && 
    practiceSentences.every((_, index) => (practiceScores[index] ?? 0) >= 80)

  useEffect(() => {
    async function loadProgress() {
      const isCompleted = await checkProgress(material.id)
      setCompleted(isCompleted)
    }
    loadProgress()
  }, [material.id, checkProgress])

  const handlePracticeScore = (index: number, score: number) => {
    setPracticeScores(prev => ({
      ...prev,
      [index]: score
    }))
  }

  async function handleComplete() {
    if (!allPracticesCompleted) return
    try {
      await updateProgress(material.id, true)
      setCompleted(true)
    } catch (error) {
      console.error('Error updating progress:', error)
    }
  }

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
      <CardContent className="space-y-6">
        {/* Main content */}
        <div className="prose prose-slate max-w-none">
          {material.content.split('\n\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        {/* Vocabulary Section */}
        {sections.vocabulary.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Vocabulary</h3>
              <div className="flex gap-2">
                {sections.vocabulary.map((word, index) => (
                  <SaveToNotebook
                    key={index}
                    content={word}
                    type="vocabulary"
                    sourceId={material.id}
                  />
                ))}
              </div>
            </div>
            <ul className="list-disc pl-6">
              {sections.vocabulary.map((word, index) => (
                <li key={index}>{word}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Sentences Section */}
        {sections.sentences.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Practice Sentences</h3>
              <div className="flex gap-2">
                {sections.sentences.map((sentence, index) => (
                  <SaveToNotebook
                    key={index}
                    content={sentence}
                    type="sentence"
                    sourceId={material.id}
                  />
                ))}
              </div>
            </div>
            <ul className="list-disc pl-6">
              {sections.sentences.map((sentence, index) => (
                <li key={index}>{sentence}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Grammar Section */}
        {sections.grammar.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Grammar Points</h3>
              <div className="flex gap-2">
                {sections.grammar.map((point, index) => (
                  <SaveToNotebook
                    key={index}
                    content={point}
                    type="grammar"
                    sourceId={material.id}
                  />
                ))}
              </div>
            </div>
            <ul className="list-disc pl-6">
              {sections.grammar.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Speaking Practice Section */}
        {practiceSentences.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Speaking Practice</h3>
            {practiceSentences.map((sentence, index) => (
              <SpeakingPractice 
                key={index}
                text={sentence}
                materialId={material.id}
                onScore={(score) => handlePracticeScore(index, score)}
              />
            ))}
          </div>
        )}

        <div className="flex justify-end">
          <Button
            onClick={handleComplete}
            disabled={completed || !allPracticesCompleted}
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