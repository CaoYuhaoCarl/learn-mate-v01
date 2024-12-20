import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { FileText, Download, ExternalLink } from 'lucide-react'

interface DocumentViewerProps {
  url: string
  fileType: string
  fileSize: number
  title?: string
}

export function DocumentViewer({ url, fileType, fileSize, title }: DocumentViewerProps) {
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <Card>
      <div className="p-4 flex items-center gap-4">
        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <FileText className="h-5 w-5 text-primary" />
        </div>

        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-medium truncate">
            {title || 'Document'}
          </h4>
          <p className="text-xs text-muted-foreground">
            {fileType.toUpperCase()} • {formatFileSize(fileSize)}
          </p>
        </div>

        <div className="flex gap-2">
          <Button variant="ghost" size="sm" asChild>
            <a href={url} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <a href={url} download>
              <Download className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </Card>
  )
}