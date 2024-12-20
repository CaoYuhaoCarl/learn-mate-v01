import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { DisplayMode } from '@/lib/types/practice'

interface DisplayModeOption {
  value: DisplayMode
  label: string
  example: {
    question: string
    answer: string
  }
}

const DISPLAY_MODES: Record<DisplayMode, DisplayModeOption> = {
  en_to_en: {
    value: 'en_to_en',
    label: 'English → English Definition',
    example: {
      question: 'sustainability',
      answer: 'The ability to maintain something...'
    }
  },
  zh_to_en: {
    value: 'zh_to_en',
    label: 'Chinese → English',
    example: {
      question: '可持续性',
      answer: 'sustainability'
    }
  },
  en_to_zh: {
    value: 'en_to_zh',
    label: 'English → Chinese',
    example: {
      question: 'sustainability',
      answer: '可持续性'
    }
  },
  zh_to_speech: {
    value: 'zh_to_speech',
    label: 'Chinese → Spoken English',
    example: {
      question: '可持续性',
      answer: '[Speak] sustainability'
    }
  },
  en_to_speech: {
    value: 'en_to_speech',
    label: 'English → Spoken English',
    example: {
      question: 'sustainability',
      answer: '[Speak] sustainability'
    }
  }
}

interface DisplayModeSelectorProps {
  mode: DisplayMode
  availableModes: DisplayMode[]
  onSelect: (mode: DisplayMode) => void
}

export function DisplayModeSelector({
  mode,
  availableModes,
  onSelect
}: DisplayModeSelectorProps) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {availableModes.map(value => {
        const option = DISPLAY_MODES[value]
        return (
          <Card
            key={value}
            className={`cursor-pointer p-4 transition-all hover:border-primary/50 ${
              mode === value ? 'border-primary ring-2 ring-primary/20' : ''
            }`}
            onClick={() => onSelect(value)}
          >
            <h3 className="font-medium mb-2">{option.label}</h3>
            <div className="text-sm text-muted-foreground space-y-1">
              <div>Q: {option.example.question}</div>
              <div>A: {option.example.answer}</div>
            </div>
          </Card>
        )
      })}
    </div>
  )
}