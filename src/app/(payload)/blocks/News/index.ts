import { News } from '@/payload-types'
import { Block } from 'payload'

export interface CatTypes {
  id: string
  title: string
  description?: string
}

export interface NewsItem {
  id: string
  title: string
  publishedDate: number
  summary: string
  slug: string
  fixed: boolean
  categories: CatTypes[]
  image?: {
    url: string
    alt: string
  }
  masonryImages?: {
    masonryImage1?: {
      url: string
      alt: string
    }
  }
  buttonVariant?: string
  className?: string
  badgeClass?: string
  shareClass?: string
}

export interface NewsTypes {
  title: string
  subtitle: string
  filter: boolean
  allNews: News[]
}

export interface PingedProps {
  title: string
  subtitle: string
}

export interface NewsBlockProps {
  title: string
  subtitle: string
  filter: boolean
  pingedNews: boolean
  pntitle: string
  pnsubtitle: string
  allNews: NewsItem[]
}

const NewsBlock: Block = {
  slug: 'newsblock',
  labels: {
    singular: 'Sección de Noticias',
    plural: 'Sección de Noticias',
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'filter',
          type: 'checkbox',
          label: 'Mostrar filtro de noticias',
        },
        {
          name: 'pingedNews',
          type: 'checkbox',
          label: '¿Mostrar noticias fijadas?',
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'pntitle',
          type: 'text',
          required: true,
          label: 'Título de noticias fijadas',
          admin: {
            condition: (_, siblingData) => siblingData.pingedNews,
          },
        },
        {
          name: 'pnsubtitle',
          type: 'text',
          required: true,
          label: 'Subtítulo de noticias fijadas',
          admin: {
            condition: (_, siblingData) => siblingData.pingedNews,
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Titulo de la seccion',
        },
        {
          name: 'subtitle',
          type: 'text',
          required: true,
          label: 'Descripción de la sección',
        },
      ],
    },

    {
      name: 'allNews',
      type: 'relationship',
      relationTo: 'news',
      hasMany: true,
    },
  ],
}

export default NewsBlock
