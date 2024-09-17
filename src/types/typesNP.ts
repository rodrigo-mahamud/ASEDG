// Tipos básicos
interface Image {
  url: string
  alt: string
}

interface Category {
  id: string
  title: string
  description?: string
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

// Tipo base para noticias
interface NewsItemBase {
  id: string
  slug: string
  title: string
  summary: string
  image: Image
  masonryImages?: MasonryImages
  publishedDate: string
  categories: Category[]
}

// Tipo para imágenes de masonry
interface MasonryImage extends Image {
  id: string
  filename: string
  mimeType: string
  filesize: number
  width: number
  height: number
  focalX: number
  focalY: number
  createdAt: string
  updatedAt: string
  thumbnailURL: string | null
}

interface MasonryImages {
  masonryImage1: MasonryImage
  masonryImage2: MasonryImage
  masonryImage3: MasonryImage
  masonryImage4: MasonryImage
  masonryImage5: MasonryImage
}

// Tipo completo para noticias
interface NewsItemFull extends NewsItemBase {
  richtxtcontent: LexicalContent
  attachments: FileAttachment[]
  style: 'vertical' | 'horizontal' | 'masonry' | 'video'
  videoUrl: string
  newsRelated: NewsItemBase[]
  masonryImages?: MasonryImages
}

// Tipos para props de componentes
interface NewsHeaderProps {
  data: NewsItemFull
  newsPageSlug: string
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

interface NewsCardProps {
  data: NewsItemBase
  className?: string
}

// Tipos para respuestas de API
interface NewsPageData {
  docs: NewsItemFull[]
}

// Tipos adicionales
interface HeadingInfo {
  id: string
  text: string
}

interface NSAIndexProps {
  indexContent: LexicalContent
}

// Tipos para NSADownloadFiles
interface DownloadAttachmentsProps {
  attachments: FileAttachment[]
}

// Tipos para ImagesMasonry
interface ImagesMasonryProps {
  imageSrcs: string[]
  imageAlts: string[]
}

export type {
  Image,
  Category,
  FileAttachment,
  LexicalNode,
  LexicalContent,
  NewsItemBase,
  NewsItemFull,
  MasonryImage,
  MasonryImages,
  NewsHeaderProps,
  NewsRelatedProps,
  NewsStickyAsideProps,
  NewsPageProps,
  NewsCardProps,
  NewsPageData,
  HeadingInfo,
  NSAIndexProps,
  DownloadAttachmentsProps,
  ImagesMasonryProps,
}
