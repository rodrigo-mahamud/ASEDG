import { Block } from 'payload/types'
interface NewsItem {
  title: string
  summary: string
  img: string
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
    singular: 'News Card Block',
    plural: 'News Card Blocks',
  },
  fields: [
    {
      name: 'news',
      label: 'Noticias destacadas',
      type: 'relationship',
      relationTo: 'noticias',
      maxRows: 12,
      hasMany: true,
      required: true,
    },
  ],
}

export default NewsList
