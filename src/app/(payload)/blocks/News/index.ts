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
  title: string
  subtitle: string
  filter: boolean
  pingedNews: boolean
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
          name: 'title',
          type: 'text',
          label: 'Titulo de la seccion',
        },

        {
          name: 'subtitle',
          type: 'text',
          label: 'Descripción de la sección',
        },
      ],
    },
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
    {
      name: 'allNews',
      type: 'relationship',
      relationTo: 'news',
      hasMany: true,
    },
  ],
}

export default NewsBlock
