import { Block } from 'payload'

export interface LinkItem {
  linkText: string
  linkType: 'internal' | 'external' | 'location' | 'tel'
  description?: string
  internal?: string
  external?: string
  location?: string
  tel?: string
  linkIcon?: string
}

interface CategoriesTypes {
  title: string
  id: string
}

interface CardAttributes {
  categories: CategoriesTypes[]
  filter: boolean
  title: string
  description: string
  links: {
    link: LinkItem[]
  }
  cardImage: {
    url: string
    alt: string
  }
}

export type Type = {
  title: string
  description: string
  filter: boolean
  cards: CardAttributes[]
  data: CardAttributes[]
}

const BookingsBlock: Block = {
  slug: 'bookingsblock',
  fields: [
    {
      type: 'text',
      label: 'NAme',
      name: 'texs',
    },
    {
      type: 'row',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Título de noticias fijadas',
        },
        {
          name: 'subtitle',
          type: 'text',
          required: true,
          label: 'Subtítulo de noticias fijadas',
        },
      ],
    },
    {
      name: 'allFacilities',
      type: 'relationship',
      hasMany: true,
      relationTo: 'facilities',
    },
  ],
}
export default BookingsBlock
