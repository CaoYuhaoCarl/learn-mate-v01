import { useTextSelection } from '@/hooks/use-text-selection'
import { SelectionPopover } from '../selection/selection-popover'

interface TextSelectionHandlerProps {
  materialId: string
}

export function TextSelectionHandler({ materialId }: TextSelectionHandlerProps) {
  const selection = useTextSelection()

  if (!selection) return null

  return (
    <SelectionPopover
      text={selection.text}
      type={selection.type}
      position={selection.position}
      sourceId={materialId}
    />
  )
}