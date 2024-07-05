import { Block } from 'payload'
export type Type = {
  newspinged: NewsItem[]
  title: string
  subtitle: string
}

type NewsItem = {
  id: string
  slug: string
  title: string
  summary: string
  image: {
    url: string
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
