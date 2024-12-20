import { NotebookItemType } from '@/hooks/use-notebook'

interface SelectionInfo {
  text: string
  type: NotebookItemType
  rect?: DOMRect
  context?: string
}

export function getSelectionInfo(selection: Selection): SelectionInfo | null {
  const selectedText = selection.toString().trim()
  if (!selectedText) return null

  // Get selection position and context
  const range = selection.getRangeAt(0)
  const rect = range.getBoundingClientRect()
  
  // Get surrounding context (up to 50 chars before and after)
  const container = range.commonAncestorContainer
  const fullText = container.textContent || ''
  const start = Math.max(0, range.startOffset - 50)
  const end = Math.min(fullText.length, range.endOffset + 50)
  const context = fullText.slice(start, end)

  // Smart type detection
  let type: NotebookItemType = 'vocabulary'
  
  // Sentence detection
  if (
    selectedText.includes('.') || 
    selectedText.length > 50 ||
    /[.!?]$/.test(selectedText)
  ) {
    type = 'sentence'
  } 
  // Grammar rule detection
  else if (
    selectedText.includes(':') || 
    /^[A-Z].*[.!?]$/.test(selectedText) ||
    selectedText.toLowerCase().includes('use') ||
    selectedText.toLowerCase().includes('when') ||
    selectedText.toLowerCase().includes('rule')
  ) {
    type = 'grammar'
  }
  // Vocabulary detection (single or compound words)
  else if (/^[A-Za-z\s-]+$/.test(selectedText)) {
    type = 'vocabulary'
  }

  return { text: selectedText, type, rect, context }
}