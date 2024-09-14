// File: @/types/typesNP.ts

export interface FileAttachment {
  id: string
  file: {
    url: string
    filename: string
    mimeType: string
    filesize: number
  }
}
interface LexicalNode {
  type: string
  tag?: string
  text?: string
  format?: number
  children?: LexicalNode[]
  // ... otros campos que puedan ser relevantes
}
interface LexicalContent {
  root: {
    children: LexicalNode[]
  }
}

export interface NSAIndexProps {
  indexContent: LexicalContent
}
export interface DownloadAttachmentsProps {
  attachments: FileAttachment[]
}

export interface NewsStickyAsideProps {
  attachments: FileAttachment[]
  indexContent: LexicalContent
}

export interface NewsPageProps {
  params: { news: string }
}

export interface NewsPage {
  slug: string
  richtxtcontent: any // Reemplazar 'any' con un tipo más específico si se conoce la estructura
  attachments: FileAttachment[]
}

export interface NewsPageData {
  docs: NewsPage[]
}
