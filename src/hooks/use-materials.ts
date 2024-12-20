import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Material, ContentSection } from '@/lib/types/material'

export function useMaterials(categoryId?: string) {
  const [materials, setMaterials] = useState<Material[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchMaterials() {
      try {
        let query = supabase
          .from('materials')
          .select(`
            id,
            title,
            description,
            content,
            content_sections,
            difficulty_level,
            estimated_time,
            thumbnail_url,
            category_id
          `)
        
        if (categoryId) {
          query = query.eq('category_id', categoryId)
        }

        const { data, error } = await query
        
        if (error) throw error

        // Transform the data to ensure content_sections is properly parsed
        const transformedMaterials = data?.map(material => ({
          ...material,
          content_sections: Array.isArray(material.content_sections) 
            ? material.content_sections 
            : parseMaterialContent(material.content)
        })) || []

        setMaterials(transformedMaterials)
      } catch (error) {
        console.error('Error fetching materials:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchMaterials()
  }, [categoryId])

  return { materials, loading }
}

// Helper function to parse legacy content format into sections
function parseMaterialContent(content: string): ContentSection[] {
  if (!content) return []

  const sections: ContentSection[] = []
  const paragraphs = content.split('\n\n')

  paragraphs.forEach((paragraph, index) => {
    // Check if paragraph is a heading
    if (paragraph.startsWith('#')) {
      const level = paragraph.match(/^#+/)?.[0].length || 1
      sections.push({
        type: 'heading',
        content: paragraph.replace(/^#+\s*/, ''),
        level: Math.min(level, 6)
      })
      return
    }

    // Check if paragraph is a list
    if (paragraph.includes('\n-')) {
      const items = paragraph
        .split('\n-')
        .filter(Boolean)
        .map(item => ({
          content: item.trim(),
          type: 'example' as const
        }))

      sections.push({
        type: 'list',
        items
      })
      return
    }

    // Regular paragraph
    sections.push({
      type: 'text',
      content: paragraph.trim()
    })
  })

  return sections
}