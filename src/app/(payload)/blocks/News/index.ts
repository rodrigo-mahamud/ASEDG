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
      name: 'news',
      label: 'Noticias destacadas',
      type: 'relationship',
      relationTo: 'noticias',
      maxRows: 4,
      hasMany: true,
      required: true,
    },
  ],
}

export default NewsList
