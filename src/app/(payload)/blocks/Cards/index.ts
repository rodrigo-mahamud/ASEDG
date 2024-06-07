import { Block } from 'payload/types'
import link from '../../fields/link'
interface CardTypes {
  title: string
  description: string
  link: {
    linkText?: string
    description: string
    internal?: {
      slug?: string
    }
    external?: {
      slug?: string
    }
  }
  image: {
    url: string
    alt: string
  }
}
export type Type = {
  cards: CardTypes[]
}
const CardsBlock: Block = {
  slug: 'cardsblock',
  labels: {
    singular: 'Sección de Tarjetas',
    plural: 'Sección de Tarjetas',
  },

  fields: [
    {
      type: 'array',
      name: 'cards',
      labels: {
        singular: 'Tarjeta',
        plural: 'Tarjetas',
      },
      label: ' ',
      maxRows: 4,
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Título de la tarjeta',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Descripción de la tarjeta',
          required: true,
        },
        {
          name: 'image',
          type: 'upload',
          label: 'Imagen',
          relationTo: 'media', // Suponiendo que tienes una colección de medios para subir archivos
          required: true,
        },
        link,
      ],
    },
  ],
}
export default CardsBlock
