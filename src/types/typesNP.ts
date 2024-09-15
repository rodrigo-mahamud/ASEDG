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

export interface NewsItemData {
  id: string
  slug: string
  title: string
  summary: string
  image: {
    url: string
  }
  categories: Array<{ title: string }> // Añadido
  publishedDate: string // Añadido
}

export interface NewsItem {
  newsRelated: NewsItemData[]
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
  richtxtcontent: LexicalContent
  attachments: FileAttachment[]
  newsRelated: NewsItemData[]
}

export interface NewsPageData {
  docs: NewsPage[]
}
