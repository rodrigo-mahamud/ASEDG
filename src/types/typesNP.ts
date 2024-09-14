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

export interface DownloadAttachmentsProps {
  attachments: FileAttachment[]
}

export interface NewsStickyAsideProps {
  attachments: FileAttachment[]
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
