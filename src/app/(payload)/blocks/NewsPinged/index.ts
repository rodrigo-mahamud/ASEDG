import { Block } from 'payload'
export type Type = {
  newspinged?: NewsItem[]
  title: string
  subtitle: string
}
interface Category {
  id: string
  title: string
  length: number
  description?: string
}
type NewsItem = {
  id: string
  slug: string
  categories: Category[]
  title: string
  summary: string
  image: {
    url: string
    alt: string
  }
  masonryImages?: {
    masonryImage1: {
      url: string
      alt: string
    }
  }
}
const NewsFeatured: Block = {
  slug: 'newspinged',
  labels: {
    singular: 'Noticias fijadas',
    plural: 'Noticias fijadas',
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'title',
          label: 'Titulo de la sección',
          type: 'text',
          required: true,
        },
        {
          name: 'subtitle',
          label: 'Descripción de la sección',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'newspinged',
      type: 'relationship',
      label: 'Noticias fijadas (8 max)',
      relationTo: 'news',
      hasMany: true,
      maxRows: 8,
      admin: { readOnly: true },
    },
  ],
}

export default NewsFeatured
