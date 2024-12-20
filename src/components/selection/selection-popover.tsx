import { NotebookItemType } from '@/hooks/use-notebook'
import { SaveToNotebook } from '../notebook/save-to-notebook'
import { Button } from '../ui/button'
import { BookmarkPlus, X } from 'lucide-react'

interface SelectionPopoverProps {
  text: string
  type: NotebookItemType
  position: { top: number; left: number }
  sourceId: string
  context?: string
  onClose: () => void
}

export function SelectionPopover({ 
  text, 
  type, 
  position, 
  sourceId,
  context,
  onClose
}: SelectionPopoverProps) {
  return (
    <div 
      className="fixed z-50 animate-in fade-in slide-in-from-top-2 duration-200 selection-popover"
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`,
        transform: 'translateX(-50%)'
      }}
    >
      <div className="bg-white rounded-lg shadow-lg border p-3 space-y-2 max-w-sm">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-primary capitalize">
            Add to {type}
          </span>
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <p className="text-sm font-medium truncate">
          {text}
        </p>
        
        {context && (
          <p className="text-xs text-muted-foreground line-clamp-2">
            Context: {context}
          </p>
        )}

        <div className="flex justify-end pt-1">
          <SaveToNotebook
            content={text}
            type={type}
            sourceId={sourceId}
            context={context}
          >
            <Button size="sm" className="gap-2">
              <BookmarkPlus className="h-4 w-4" />
              Save
            </Button>
          </SaveToNotebook>
        </div>
      </div>
    </div>
  )
}