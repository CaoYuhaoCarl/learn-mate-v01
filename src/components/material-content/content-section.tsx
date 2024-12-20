import { useState } from 'react'
import { NotebookItemType } from '@/hooks/use-notebook'
import { BookmarkPlus } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ContentSectionProps {
  title: string
  items: Array<{
    content: string
    definition?: string
    level?: number
  }>
  type: NotebookItemType
  materialId: string
  onSave: (item: { content: string, definition?: string }) => Promise<void>
}

export function ContentSection({ 
  title, 
  items, 
  type, 
  onSave 
}: ContentSectionProps) {
  const [savedItems, setSavedItems] = useState<Set<string>>(new Set())
  const [savingItem, setSavingItem] = useState<string | null>(null)

  const handleSave = async (item: { content: string, definition?: string }) => {
    if (savedItems.has(item.content) || savingItem === item.content) return
    
    setSavingItem(item.content)
    try {
      await onSave(item)
      setSavedItems(prev => new Set([...prev, item.content]))
      // Reset after animation
      setTimeout(() => {
        setSavedItems(prev => {
          const next = new Set(prev)
          next.delete(item.content)
          return next
        })
      }, 2000)
    } finally {
      setSavingItem(null)
    }
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">{title}</h3>
      <div className="grid gap-3">
        {items.map((item, index) => {
          const isSaved = savedItems.has(item.content)
          const isSaving = savingItem === item.content

          return (
            <div
              key={index}
              className="group relative bg-white rounded-lg border shadow-sm hover:shadow-md transition-all duration-200"
            >
              <div className="p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1 flex-1">
                    <p className="font-medium">{item.content}</p>
                    {item.definition && (
                      <p className="text-sm text-muted-foreground">
                        {item.definition}
                      </p>
                    )}
                    {item.level && (
                      <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                        Level {item.level}
                      </span>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSave(item)}
                    disabled={isSaved || isSaving}
                    className={`
                      transition-all duration-300
                      ${isSaved ? 'bg-primary/10 text-primary' : 'hover:bg-primary/10'}
                    `}
                  >
                    <BookmarkPlus className={`h-4 w-4 ${isSaving ? 'animate-pulse' : ''}`} />
                  </Button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}