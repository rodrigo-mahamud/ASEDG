import { News } from '@/payload-types'
import { Block } from 'payload'

export type Type = {
  newsFour: News[]
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
