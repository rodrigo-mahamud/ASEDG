import { Block } from 'payload/types'

const NewsFeatured: Block = {
  slug: 'newspinged',
  labels: {
    singular: 'Noticias fijadas',
    plural: 'Noticias fijadas',
  },
  fields: [
    {
      name: 'newspinged',
      type: 'relationship',
      relationTo: 'news',
      hasMany: true,
      maxRows: 8,
    },
  ],
}

export default NewsFeatured
