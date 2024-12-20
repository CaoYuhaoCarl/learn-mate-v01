import { useState, useCallback, useEffect } from 'react'
import { NotebookItemType } from '@/hooks/use-notebook'
import { getSelectionInfo } from '@/lib/utils/text-selection'

interface SelectionState {
  text: string
  type: NotebookItemType
  position: { top: number; left: number }
  context?: string
}

export function useTextSelection() {
  const [selection, setSelection] = useState<SelectionState | null>(null)
  const [isSelecting, setIsSelecting] = useState(false)

  const handleSelectionStart = useCallback(() => {
    setIsSelecting(true)
    setSelection(null)
  }, [])

  const handleSelectionEnd = useCallback(() => {
    if (!isSelecting) return

    const windowSelection = window.getSelection()
    if (!windowSelection) return

    const selectionInfo = getSelectionInfo(windowSelection)
    if (!selectionInfo) {
      setSelection(null)
      return
    }

    const { text, type, rect, context } = selectionInfo
    if (!rect) return

    // Calculate better popover position
    const viewportHeight = window.innerHeight
    const scrollY = window.scrollY
    const selectionTop = rect.top + scrollY
    const selectionBottom = rect.bottom + scrollY

    // Position above or below selection based on viewport space
    const spaceAbove = selectionTop - scrollY
    const spaceBelow = viewportHeight - (selectionBottom - scrollY)
    const preferredOffset = 45

    const top = spaceBelow > 100 
      ? selectionBottom + preferredOffset
      : selectionTop - preferredOffset

    setSelection({
      text,
      type,
      context,
      position: {
        top,
        left: rect.left + (rect.width / 2)
      }
    })

    setIsSelecting(false)
  }, [isSelecting])

  const clearSelection = useCallback(() => {
    setSelection(null)
    setIsSelecting(false)
    window.getSelection()?.removeAllRanges()
  }, [])

  // Handle clicks outside selection
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!selection) return

      const target = e.target as HTMLElement
      if (!target.closest('.selection-popover')) {
        clearSelection()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [selection, clearSelection])

  return {
    selection,
    clearSelection,
    handleSelectionStart,
    handleSelectionEnd
  }
}