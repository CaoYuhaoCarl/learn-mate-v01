import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Settings } from 'lucide-react'
import { PracticeMode, DisplayMode } from '@/lib/types/practice'
import { PracticeModeSelector } from './practice-mode-selector'
import { DisplayModeSelector } from './display-mode-selector'
import { usePracticeSettings } from '@/hooks/use-practice-settings'

interface PracticeSettingsProps {
  onClose: () => void
}

export function PracticeSettings({ onClose }: PracticeSettingsProps) {
  const { settings, updateSettings, loading } = usePracticeSettings()
  const [mode, setMode] = useState<PracticeMode>(settings.practiceMode)
  const [displayMode, setDisplayMode] = useState<DisplayMode>(settings.displayMode)

  const availableDisplayModes = mode === 'guided' 
    ? ['en_to_en', 'zh_to_en', 'en_to_zh'] as DisplayMode[]
    : ['zh_to_speech', 'en_to_speech'] as DisplayMode[]

  const handleSave = async () => {
    await updateSettings({
      practiceMode: mode,
      displayMode: displayMode
    })
    onClose()
  }

  if (loading) return null

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
      <Card className="w-full max-w-4xl m-4">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Practice Settings
          </CardTitle>
          <Button variant="ghost" onClick={onClose}>Close</Button>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Practice Mode</h3>
            <PracticeModeSelector
              selectedMode={mode}
              onSelectMode={setMode}
            />
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Display Mode</h3>
            <DisplayModeSelector
              mode={displayMode}
              availableModes={availableDisplayModes}
              onSelect={setDisplayMode}
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              Save Settings
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}