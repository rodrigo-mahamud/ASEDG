import { Block } from 'payload/types'

interface CatTypes {
  title: string
  description: string
}
interface NewsItem {
  title: string
  summary: string
  img: string
  categorias: CatTypes[]
  buttonVariant?: string
  className?: string
  badgeClass?: string
  shareClass?: string
  shareUrl: string
  image: {
    url: string
    alt: string
  }
}

export type Type = {
  news: NewsItem[]
}
const NewsList: Block = {
  slug: 'newslist',
  labels: {
    singular: 'Bloque de Noticias',
    plural: 'Bloque de Noticias',
  },
  fields: [
    {
      name: 'newsLimit',
      label: 'Número de Noticias a Mostrar',
      type: 'select',
      options: [
        {
          label: '4',
          value: '4',
        },
        {
          label: '8',
          value: '8',
        },
        {
          label: '12',
          value: '12',
        },
        {
          label: 'Todas',
          value: 'all',
        },
      ],
      defaultValue: 'all',
      required: true,
    },
    {
      name: 'newsRelationship',
      type: 'relationship',
      relationTo: 'news',
      hasMany: true,
    },
  ],
}

export default NewsList
