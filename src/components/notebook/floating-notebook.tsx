import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { BookMarked, X } from 'lucide-react'
import { NotebookList } from './notebook-list'
import { cn } from '@/lib/utils'

export function FloatingNotebook() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Floating button */}
      <Button
        className="fixed bottom-6 right-6 h-12 w-12 rounded-full shadow-lg"
        onClick={() => setIsOpen(true)}
      >
        <BookMarked className="h-6 w-6" />
      </Button>

      {/* Notebook panel */}
      <div
        className={cn(
          "fixed inset-y-0 right-0 w-full max-w-md transform transition-transform duration-300 ease-in-out z-50",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <Card className="h-full overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-semibold">My Notebook</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="h-[calc(100%-65px)] overflow-y-auto p-4">
            <NotebookList />
          </div>
        </Card>
      </div>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  )
}