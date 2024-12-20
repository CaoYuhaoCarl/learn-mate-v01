import { useEffect } from 'react'
import { useNotebook, NotebookItem as NotebookItemType } from '@/hooks/use-notebook'
import { NotebookItem } from './notebook-item'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export function NotebookList() {
  const { 
    items, 
    loading, 
    removeItem, 
    updateNotes, 
    togglePractice, 
    fetchItems 
  } = useNotebook()

  useEffect(() => {
    fetchItems()
  }, [fetchItems])

  const handlePractice = (item: NotebookItemType) => {
    // TODO: Implement practice functionality
    console.log('Practice item:', item)
  }

  if (loading) {
    return <div>Loading notebook...</div>
  }

  const vocabularyItems = items.filter(item => item.type === 'vocabulary')
  const sentenceItems = items.filter(item => item.type === 'sentence')
  const grammarItems = items.filter(item => item.type === 'grammar')

  return (
    <Card>
      <CardHeader>
        <CardTitle>My Notebook</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="vocabulary">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="vocabulary">
              Vocabulary ({vocabularyItems.length})
            </TabsTrigger>
            <TabsTrigger value="sentences">
              Sentences ({sentenceItems.length})
            </TabsTrigger>
            <TabsTrigger value="grammar">
              Grammar ({grammarItems.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="vocabulary" className="space-y-4 mt-4">
            {vocabularyItems.map(item => (
              <NotebookItem
                key={item.id}
                item={item}
                onDelete={removeItem}
                onUpdateNotes={updateNotes}
                onTogglePractice={togglePractice}
                onPractice={handlePractice}
              />
            ))}
            {vocabularyItems.length === 0 && (
              <p className="text-muted-foreground text-center py-4">
                No vocabulary items saved yet
              </p>
            )}
          </TabsContent>

          <TabsContent value="sentences" className="space-y-4 mt-4">
            {sentenceItems.map(item => (
              <NotebookItem
                key={item.id}
                item={item}
                onDelete={removeItem}
                onUpdateNotes={updateNotes}
                onTogglePractice={togglePractice}
                onPractice={handlePractice}
              />
            ))}
            {sentenceItems.length === 0 && (
              <p className="text-muted-foreground text-center py-4">
                No sentences saved yet
              </p>
            )}
          </TabsContent>

          <TabsContent value="grammar" className="space-y-4 mt-4">
            {grammarItems.map(item => (
              <NotebookItem
                key={item.id}
                item={item}
                onDelete={removeItem}
                onUpdateNotes={updateNotes}
                onTogglePractice={togglePractice}
                onPractice={handlePractice}
              />
            ))}
            {grammarItems.length === 0 && (
              <p className="text-muted-foreground text-center py-4">
                No grammar points saved yet
              </p>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}