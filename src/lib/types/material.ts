export type ContentSectionType = 'text' | 'image' | 'video' | 'audio' | 'document' | 'heading' | 'list'

export interface MediaContent {
  url: string
  alt?: string
  caption?: string
  thumbnail?: string
}

export interface ListItem {
  content: string
  definition?: string
  type?: 'vocabulary' | 'grammar' | 'example'
}

export interface ContentSection {
  type: ContentSectionType
  content?: string
  level?: number
  items?: ListItem[]
  image?: MediaContent
  video?: MediaContent
  audio?: MediaContent
  document?: MediaContent & {
    fileType: string
    fileSize: number
  }
  selectable?: boolean
}

export interface Material {
  id: string
  title: string
  description: string
  content: string
  content_sections: ContentSection[]
  difficulty_level: 'beginner' | 'intermediate' | 'advanced'
  estimated_time: number
  thumbnail_url?: string
  category_id: string
}