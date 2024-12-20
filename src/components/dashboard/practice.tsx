import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Brain, GraduationCap, Settings } from 'lucide-react'
import { VocabularyBattle } from '../battle/vocabulary-battle'
import { PracticeSettings } from '../practice/practice-settings'

export function Practice() {
  const [showVocabBattle, setShowVocabBattle] = useState(false)
  const [showSettings, setShowSettings] = useState(false)

  const handleStartBattle = () => {
    setShowSettings(true)
  }

  const handleSettingsClose = () => {
    setShowSettings(false)
    setShowVocabBattle(true)
  }

  if (showVocabBattle) {
    return <VocabularyBattle />
  }

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5" />
              Vocabulary Battle
            </CardTitle>
            <CardDescription>Test your word knowledge</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Challenge yourself with vocabulary quizzes and compete against AI opponents.
            </p>
            <Button onClick={handleStartBattle} className="gap-2">
              <Settings className="h-4 w-4" />
              Configure Practice
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5" />
              Grammar Practice
            </CardTitle>
            <CardDescription>Improve your language structure</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Interactive exercises to master English grammar rules.
            </p>
            <Button disabled>Coming Soon</Button>
          </CardContent>
        </Card>
      </div>

      {showSettings && (
        <PracticeSettings onClose={handleSettingsClose} />
      )}
    </>
  )
}