// Tipos básicos
interface Image {
  url: string
  alt?: string
}

interface Category {
  id: string
  title: string
}

interface FileAttachment {
  id: string
  file: {
    url: string
    filename: string
    mimeType: string
    filesize: number
  }
}

// Tipos para el contenido de texto enriquecido
interface LexicalNode {
  type: string
  tag?: string
  text?: string
  format?: number
  children?: LexicalNode[]
}

interface LexicalContent {
  root: {
    children: LexicalNode[]
  }
}

// Tipos para los elementos de noticias
interface NewsItemBase {
  id: string
  slug: string
  title: string
  summary: string
  image: Image
  publishedDate: string
  categories: Category[]
}

interface NewsItemFull extends NewsItemBase {
  richtxtcontent: LexicalContent
  attachments: FileAttachment[]
  style: 'vertical' | 'horizontal' | 'masonry'
  newsRelated: NewsItemBase[]
}

// Tipos para las props de los componentes
interface NewsHeaderProps {
  data: NewsItemFull
}

interface NewsRelatedProps {
  newsRelated: NewsItemBase[]
}

interface NewsStickyAsideProps {
  attachments: FileAttachment[]
  indexContent: LexicalContent
}

interface NewsPageProps {
  params: { news: string }
}

// Tipos para las respuestas de la API
interface NewsPageData {
  docs: NewsItemFull[]
}
// Tipos para NSADownloadFiles
interface FileAttachment {
  id: string
  file: {
    url: string
    filename: string
    mimeType: string
    filesize: number
  }
}

interface DownloadAttachmentsProps {
  attachments: FileAttachment[]
}

// Tipos para NSAIndex
interface HeadingInfo {
  id: string
  text: string
}

interface NSAIndexProps {
  indexContent: LexicalContent
}
export type {
  FileAttachment,
  DownloadAttachmentsProps,
  HeadingInfo,
  NSAIndexProps,
  Image,
  Category,
  LexicalNode,
  LexicalContent,
  NewsItemBase,
  NewsItemFull,
  NewsHeaderProps,
  NewsRelatedProps,
  NewsStickyAsideProps,
  NewsPageProps,
  NewsPageData,
}
