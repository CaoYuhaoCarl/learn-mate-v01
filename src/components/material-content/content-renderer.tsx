import { ContentSection, ListItem } from '@/lib/types/material'
import { MediaPlayer } from './media-player'
import { DocumentViewer } from './document-viewer'
import { cn } from '@/lib/utils'

interface ContentRendererProps {
  section: ContentSection
  className?: string
}

function ListItemRenderer({ item }: { item: ListItem }) {
  return (
    <div className="group flex items-start gap-2 p-2 rounded-lg hover:bg-primary/5">
      <div className="flex-1 space-y-1">
        <p className="font-medium">{item.content}</p>
        {item.definition && (
          <p className="text-sm text-muted-foreground">{item.definition}</p>
        )}
      </div>
      {item.type && (
        <span className="text-xs font-medium text-primary capitalize">
          {item.type}
        </span>
      )}
    </div>
  )
}

export function ContentRenderer({ section, className }: ContentRendererProps) {
  if (!section || typeof section !== 'object') {
    console.warn('Invalid section:', section)
    return null
  }

  const content = (() => {
    switch (section.type) {
      case 'heading':
        const HeadingTag = `h${section.level || 2}` as keyof JSX.IntrinsicElements
        return (
          <HeadingTag className={cn('font-bold tracking-tight mb-4', {
            'text-3xl': section.level === 1,
            'text-2xl': section.level === 2,
            'text-xl': section.level === 3,
            'text-lg': section.level === 4,
          })}>
            {section.content}
          </HeadingTag>
        )

      case 'text':
        return (
          <div className="prose prose-slate max-w-none">
            <p className="text-muted-foreground leading-relaxed">{section.content}</p>
          </div>
        )

      case 'list':
        if (!section.items?.length) return null
        return (
          <div className="space-y-2">
            {section.items.map((item, index) => (
              <ListItemRenderer key={index} item={item} />
            ))}
          </div>
        )

      case 'image':
        if (!section.image?.url) return null
        return (
          <figure className="my-8">
            <div className="overflow-hidden rounded-lg border bg-muted">
              <img
                src={section.image.url}
                alt={section.image.alt || ''}
                className="w-full h-auto object-cover aspect-video"
                loading="lazy"
              />
            </div>
            {section.image.caption && (
              <figcaption className="mt-3 text-sm text-center text-muted-foreground">
                {section.image.caption}
              </figcaption>
            )}
          </figure>
        )

      case 'video':
        if (!section.video?.url) return null
        return (
          <div className="my-8">
            <MediaPlayer
              type="video"
              src={section.video.url}
              poster={section.video.thumbnail}
              title={section.video.caption}
            />
          </div>
        )

      case 'audio':
        if (!section.audio?.url) return null
        return (
          <div className="my-8">
            <MediaPlayer
              type="audio"
              src={section.audio.url}
              title={section.audio.caption}
            />
          </div>
        )

      case 'document':
        if (!section.document?.url) return null
        return (
          <div className="my-8">
            <DocumentViewer
              url={section.document.url}
              fileType={section.document.fileType}
              fileSize={section.document.fileSize}
              title={section.document.caption}
            />
          </div>
        )

      default:
        console.warn('Unknown section type:', section.type)
        return null
    }
  })()

  if (!content) return null
  return <div className={className}>{content}</div>
}