import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Clock } from 'lucide-react'
import { Material } from '@/lib/types/material'

interface MaterialCardProps {
  material: Material
  onSelect: (material: Material) => void
}

export function MaterialCard({ material, onSelect }: MaterialCardProps) {
  return (
    <Card className="hover:border-primary/50 transition-colors">
      {material.thumbnail_url && (
        <div className="aspect-video w-full overflow-hidden rounded-t-lg">
          <img
            src={material.thumbnail_url}
            alt={material.title}
            className="h-full w-full object-cover"
          />
        </div>
      )}
      <CardHeader>
        <CardTitle>{material.title}</CardTitle>
        <CardDescription className="flex items-center gap-2">
          <Clock className="h-4 w-4" />
          {material.estimated_time} minutes
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">{material.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium capitalize">
            {material.difficulty_level}
          </span>
          <Button onClick={() => onSelect(material)}>Start Learning</Button>
        </div>
      </CardContent>
    </Card>
  )
}