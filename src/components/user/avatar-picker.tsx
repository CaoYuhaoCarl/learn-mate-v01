import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { X, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react'
import { AVATAR_STYLES, getAvatarsByCategory } from '@/lib/constants/avatars'
import { cn } from '@/lib/utils'

interface AvatarPickerProps {
  currentStyle: string
  seed: string
  onSelect: (style: string) => void
  onClose: () => void
  loading?: boolean
}

export function AvatarPicker({ 
  currentStyle, 
  seed, 
  onSelect, 
  onClose,
  loading 
}: AvatarPickerProps) {
  const [page, setPage] = useState(0)
  const avatarsByCategory = getAvatarsByCategory()
  const categories = Object.keys(avatarsByCategory)

  return (
    <Card className="w-[320px] p-4 absolute right-0 top-full mt-2 z-[60]">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium">Choose Avatar Style</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="h-8 w-8 p-0"
          disabled={loading}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      <Tabs defaultValue={categories[0]} className="space-y-4">
        <TabsList className="w-full">
          {categories.map(category => (
            <TabsTrigger
              key={category}
              value={category}
              className="flex-1 text-xs"
            >
              {category.split(' ')[0]}
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map(category => (
          <TabsContent key={category} value={category} className="space-y-4">
            <div className="grid grid-cols-3 gap-3">
              {avatarsByCategory[category].map((style) => (
                <button
                  key={style.id}
                  onClick={() => onSelect(style.id)}
                  disabled={loading}
                  className={cn(
                    "p-2 rounded-lg border-2 transition-all hover:border-primary/50",
                    currentStyle === style.id ? "border-primary" : "border-transparent",
                    loading && "opacity-50 cursor-not-allowed"
                  )}
                >
                  <div className="relative">
                    <img
                      src={style.preview(seed)}
                      alt={style.name}
                      className="w-full aspect-square rounded-md"
                    />
                    {loading && currentStyle === style.id && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/10 rounded-md">
                        <Loader2 className="h-4 w-4 animate-spin text-primary" />
                      </div>
                    )}
                  </div>
                  <span className="text-xs text-center block mt-1 truncate">
                    {style.name}
                  </span>
                </button>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </Card>
  )
}