import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { Pencil, Save, Trash2, BookOpen } from 'lucide-react'
import { NotebookItem as NotebookItemType } from '@/hooks/use-notebook'

interface NotebookItemProps {
  item: NotebookItemType
  onDelete: (id: string) => Promise<void>
  onUpdateNotes: (id: string, notes: string) => Promise<void>
  onTogglePractice: (id: string, enabled: boolean) => Promise<void>
  onPractice: (item: NotebookItemType) => void
}

export function NotebookItem({ 
  item, 
  onDelete, 
  onUpdateNotes,
  onTogglePractice,
  onPractice 
}: NotebookItemProps) {
  const [editing, setEditing] = useState(false)
  const [notes, setNotes] = useState(item.notes || '')

  const handleSave = async () => {
    await onUpdateNotes(item.id, notes)
    setEditing(false)
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium capitalize">
          {item.type}
        </CardTitle>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Practice</span>
            <Switch
              checked={item.practiceEnabled}
              onCheckedChange={(checked) => onTogglePractice(item.id, checked)}
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onPractice(item)}
            >
              <BookOpen className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(item.id)}
            >
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="mb-2">{item.content}</p>
        {editing ? (
          <div className="flex gap-2">
            <Input
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add notes..."
            />
            <Button size="sm" onClick={handleSave}>
              <Save className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div className="flex justify-between items-center text-sm text-muted-foreground">
            <span>{notes || 'No notes'}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setEditing(true)}
            >
              <Pencil className="h-4 w-4" />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}