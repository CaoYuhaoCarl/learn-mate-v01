import { ReactNode } from 'react'

interface SelectableTextProps {
  children: ReactNode
  className?: string
  onSelectionStart?: () => void
  onSelectionEnd?: () => void
}

export function SelectableText({ 
  children, 
  className,
  onSelectionStart,
  onSelectionEnd 
}: SelectableTextProps) {
  return (
    <div 
      className={`prose prose-slate max-w-none select-text cursor-text 
        transition-colors duration-200 hover:bg-primary/5 rounded-lg p-4 
        selection:bg-primary/20 selection:text-primary-foreground ${className}`}
      onMouseDown={onSelectionStart}
      onMouseUp={onSelectionEnd}
    >
      {children}
    </div>
  )
}