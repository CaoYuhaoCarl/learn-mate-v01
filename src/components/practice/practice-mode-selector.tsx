import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Brain, Mic } from 'lucide-react'
import { PracticeMode, DisplayMode } from '@/lib/types/practice'

interface PracticeModeOption {
  mode: PracticeMode
  displayModes: {
    value: DisplayMode
    label: string
  }[]
  icon: typeof Brain | typeof Mic
  title: string
  description: string
}

const PRACTICE_MODES: PracticeModeOption[] = [
  {
    mode: 'guided',
    displayModes: [
      { value: 'en_to_en', label: 'English → English Definition' },
      { value: 'zh_to_en', label: 'Chinese → English' },
      { value: 'en_to_zh', label: 'English → Chinese' }
    ],
    icon: Brain,
    title: 'Guided Practice',
    description: 'Multiple choice questions with different display modes'
  },
  {
    mode: 'speech',
    displayModes: [
      { value: 'zh_to_speech', label: 'Chinese → Spoken English' },
      { value: 'en_to_speech', label: 'English → Spoken English' }
    ],
    icon: Mic,
    title: 'Speech Practice',
    description: 'Practice pronunciation with speech recognition'
  }
]

interface PracticeModeCardProps {
  option: PracticeModeOption
  selected: boolean
  onSelect: () => void
}

function PracticeModeCard({ option, selected, onSelect }: PracticeModeCardProps) {
  const Icon = option.icon
  
  return (
    <Card 
      className={`cursor-pointer transition-all hover:border-primary/50 ${
        selected ? 'border-primary ring-2 ring-primary/20' : ''
      }`}
      onClick={onSelect}
    >
      <CardHeader>
        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
          <Icon className="h-6 w-6 text-primary" />
        </div>
        <CardTitle className="text-lg">{option.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          {option.description}
        </p>
        <div className="space-y-2">
          {option.displayModes.map(mode => (
            <div 
              key={mode.value}
              className="text-sm font-medium"
            >
              • {mode.label}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

interface PracticeModeSelectorProps {
  selectedMode: PracticeMode
  onSelectMode: (mode: PracticeMode) => void
}

export function PracticeModeSelector({ 
  selectedMode,
  onSelectMode 
}: PracticeModeSelectorProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {PRACTICE_MODES.map(option => (
        <PracticeModeCard
          key={option.mode}
          option={option}
          selected={selectedMode === option.mode}
          onSelect={() => onSelectMode(option.mode)}
        />
      ))}
    </div>
  )
}