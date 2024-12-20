import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Headphones, BookOpen, PlayCircle } from 'lucide-react'
import { useMaterials, Material } from '@/hooks/use-materials'
import { MaterialCard } from './material-card'
import { MaterialContent } from './material-content'

export function LearningMaterials() {
  const { materials, loading } = useMaterials()
  const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(null)

  if (loading) {
    return <div>Loading materials...</div>
  }

  if (selectedMaterial) {
    return (
      <MaterialContent
        material={selectedMaterial}
        onBack={() => setSelectedMaterial(null)}
      />
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {materials.map((material) => (
        <MaterialCard
          key={material.id}
          material={material}
          onSelect={setSelectedMaterial}
        />
      ))}
    </div>
  )
}