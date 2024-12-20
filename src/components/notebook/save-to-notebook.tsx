import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { BookmarkPlus, Check } from 'lucide-react'
import { useNotebook, NotebookItemType } from '@/hooks/use-notebook'

interface SaveToNotebookProps {
  content: string
  type: NotebookItemType
  sourceId: string
}

export function SaveToNotebook({ content, type, sourceId }: SaveToNotebookProps) {
  const { addItem } = useNotebook()
  const [saved, setSaved] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSave = async () => {
    if (saved || loading) return
    
    setLoading(true)
    try {
      await addItem(content, type, sourceId)
      setSaved(true)
      // Reset after animation
      setTimeout(() => setSaved(false), 2000)
    } catch (error) {
      console.error('Error saving to notebook:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button
      variant={saved ? "default" : "ghost"}
      size="sm"
      onClick={handleSave}
      disabled={saved || loading}
      className={`
        transition-all duration-300
        ${saved ? 'bg-primary/10 text-primary' : 'hover:bg-primary/10'}
      `}
    >
      {saved ? (
        <Check className="h-4 w-4" />
      ) : (
        <BookmarkPlus className="h-4 w-4" />
      )}
    </Button>
  )
}