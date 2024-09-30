// Tipos básicos
export interface Image {
  url: string
  alt: string
}

export interface Category {
  id: string
  title: string
  description?: string
}

export interface FileAttachment {
  id: string
  file: {
    url: string
    filename: string
    mimeType: string
    filesize: number
  }
}

// Tipos para el contenido de texto enriquecido
export interface LexicalNode {
  type: string
  tag?: string
  text?: string
  format?: number
  children?: LexicalNode[]
}

export interface LexicalContent {
  root: {
    children: LexicalNode[]
  }
}

// Tipo base para noticias
export interface NewsItemBase {
  id: string
  slug: string
  title: string
  summary: string
  videoUrl: string
  image: Image
  masonryImages?: MasonryImages
  publishedDate: string
  categories: Category[]
  shareClass?: string
}

// Tipo para imágenes de masonry
export interface MasonryImage extends Image {
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

export interface MasonryImages {
  masonryImage1: MasonryImage
  masonryImage2: MasonryImage
  masonryImage3: MasonryImage
  masonryImage4: MasonryImage
  masonryImage5: MasonryImage
}

// Tipo completo para noticias
export interface NewsItemFull extends NewsItemBase {
  richtxtcontent: LexicalContent
  attachments: FileAttachment[]
  style: 'vertical' | 'horizontal' | 'masonry' | 'video'
  videoUrl: string
  newsRelated: NewsItemBase[]
  masonryImages?: MasonryImages
}

// Tipos para props de componentes
export interface NewsHeaderProps {
  data: NewsItemFull
}

export interface NewsRelatedProps {
  newsRelated: NewsItemBase[]
}

export interface NewsStickyAsideProps {
  attachments: FileAttachment[]
  indexContent: LexicalContent
}

export interface NewsPageProps {
  params: { news: string }
}

export interface NewsCardProps {
  data: NewsItemBase
  className?: string
}

// Tipos para respuestas de API
export interface NewsPageData {
  docs: NewsItemFull[]
}

// Tipos adicionales
export interface HeadingInfo {
  id: string
  text: string
}
export interface IndexHeroTypes {
  data: {
    pretitle: string
    title: string
    description: string
    newsFour: NewsItemBase[]
  }
}
export interface IndexHighlightedNewProps {
  data: NewsItemBase[]
}
export interface NSAIndexProps {
  indexContent: LexicalContent
}

// Tipos para NSADownloadFiles
export interface DownloadAttachmentsProps {
  attachments: FileAttachment[]
}

// Tipos para ImagesMasonry
export interface ImagesMasonryProps {
  imageSrcs: string[]
  imageAlts: string[]
}
export interface HeroGlowTypes {
  publishedDate?: string
  data: {
    title: any
    displaydate?: boolean
  }
}
