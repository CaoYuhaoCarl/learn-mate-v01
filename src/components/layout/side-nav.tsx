import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { BookOpen, Brain, LineChart, Menu, ChevronLeft, ChevronRight } from 'lucide-react'

interface NavItem {
  label: string
  value: string
  icon: React.ReactNode
}

const navItems: NavItem[] = [
  { label: 'Learn', value: 'materials', icon: <BookOpen className="h-5 w-5" /> },
  { label: 'Practice', value: 'practice', icon: <Brain className="h-5 w-5" /> },
  { label: 'Progress', value: 'progress', icon: <LineChart className="h-5 w-5" /> },
]

interface SideNavProps {
  value: string
  onValueChange: (value: string) => void
}

export function SideNav({ value, onValueChange }: SideNavProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <div className={cn(
      "fixed left-0 top-[65px] h-[calc(100vh-65px)] bg-background border-r transition-all duration-300",
      isCollapsed ? "w-[60px]" : "w-[200px]"
    )}>
      <div className="flex flex-col h-full">
        <Button
          variant="ghost"
          size="sm"
          className="absolute -right-3 top-3 h-6 w-6 rounded-full border bg-background p-0 hover:bg-primary/10"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>

        <nav className="space-y-1 p-2">
          {navItems.map((item) => (
            <Button
              key={item.value}
              variant={value === item.value ? "default" : "ghost"}
              className={cn(
                "w-full justify-start transition-all duration-200",
                isCollapsed && "justify-center px-2",
                value === item.value && "bg-primary text-primary-foreground hover:bg-primary/90"
              )}
              onClick={() => onValueChange(item.value)}
            >
              {item.icon}
              {!isCollapsed && (
                <span className={cn(
                  "ml-2 transition-opacity duration-200",
                  isCollapsed && "opacity-0"
                )}>
                  {item.label}
                </span>
              )}
            </Button>
          ))}
        </nav>
      </div>
    </div>
  )
}