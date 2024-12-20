import { Sparkles, AlertCircle } from 'lucide-react'
import { useFragments } from '@/hooks/use-fragments'
import { cn } from '@/lib/utils'
import { Button } from '../ui/button'

interface FragmentsDisplayProps {
  className?: string
  showIcon?: boolean
  showLabel?: boolean
}

export function FragmentsDisplay({ 
  className = '', 
  showIcon = true,
  showLabel = true
}: FragmentsDisplayProps) {
  const { totalFragments, loading, error, retry } = useFragments()

  if (loading) {
    return (
      <div className={cn(
        "flex items-center gap-1.5 text-primary animate-pulse",
        className
      )}>
        {showIcon && <Sparkles className="h-4 w-4 opacity-50" />}
        <span className="w-8 h-4 bg-primary/10 rounded" />
        {showLabel && (
          <span className="text-xs text-muted-foreground opacity-50">
            fragments
          </span>
        )}
      </div>
    )
  }

  if (error) {
    return (
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={retry}
        className="text-destructive hover:text-destructive"
      >
        <AlertCircle className="h-4 w-4 mr-2" />
        Retry
      </Button>
    )
  }

  return (
    <div className={cn("flex items-center gap-1.5 text-primary", className)}>
      {showIcon && <Sparkles className="h-4 w-4" />}
      <span className="font-medium">{totalFragments}</span>
      {showLabel && (
        <span className="text-xs text-muted-foreground">fragments</span>
      )}
    </div>
  )
}