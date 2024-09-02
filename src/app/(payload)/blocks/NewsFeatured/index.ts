import { Block } from 'payload'

interface CatTypes {
  title: string
  description: string
}
interface NewsItem {
  title: string
  summary: string
  img: string
  categories: CatTypes[]
  buttonVariant?: string
  className?: string
  badgeClass?: string
  shareClass?: string
  shareUrl: string
  slug: string
  image: {
    url: string
    alt: string
  }
}

export type Type = {
  newsFour: NewsItem[]
}
const NewsPinged: Block = {
  slug: 'newsfeatured',
  labels: {
    singular: 'Bloque de Noticias',
    plural: 'Bloque de Noticias',
  },
  fields: [
    {
      name: 'newsFour',
      type: 'relationship',
      relationTo: 'news',
      hasMany: true,
      maxRows: 4,
    },
  ],
}

export default NewsPinged
