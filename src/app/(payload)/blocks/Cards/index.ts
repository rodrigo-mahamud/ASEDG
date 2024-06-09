import { Block } from 'payload/types'
import link from '../../fields/link'

interface cardAtributess {
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
  title: string
  description: string
  cards: cardAtributess[]
}

const CardsBlock: Block = {
  slug: 'cardsblock',
  labels: {
    singular: 'Sección de Tarjetas',
    plural: 'Sección de Tarjetas',
  },

  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Título de la sección',
          required: true,
        },
        {
          name: 'description',
          type: 'text',
          label: 'Descripción de la sección',
          required: true,
        },
      ],
    },

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
          type: 'row',
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
          ],
        },
        {
          name: 'cardAtributes',
          type: 'select',
          label: 'Tipo de tarjeta',
          hasMany: true,
          options: [
            {
              label: 'Imagen',
              value: 'image',
            },

            {
              label: 'Categorías',
              value: 'categories',
            },
            {
              label: 'Enlaces',
              value: 'links',
            },
          ],
          required: false,
        },
        {
          name: 'cardImage',
          type: 'upload',
          label: 'Imagen',
          relationTo: 'media', // Suponiendo que tienes una colección de medios para subir archivos
          required: true,
          admin: {
            condition: (data, siblingData) => siblingData?.cardAtributes?.includes('image'),
          },
        },
        {
          name: 'imageFull',
          label: 'Imagen con ancho completo',
          type: 'checkbox',
          admin: {
            condition: (data, siblingData) => siblingData?.cardAtributes?.includes('image'),
          },
        },
        {
          name: 'categories',
          type: 'relationship',
          label: 'Categorías',
          relationTo: 'categorias', // Suponiendo que tienes una colección de categorías
          hasMany: true,
          admin: {
            condition: (data, siblingData) => siblingData?.cardAtributes?.includes('categories'),
          },
        },

        {
          name: 'links',
          type: 'array',
          label: ' ',
          labels: {
            singular: 'Enlace',
            plural: 'Enlaces',
          },

          fields: [link],
          admin: {
            condition: (data, siblingData) => siblingData?.cardAtributes?.includes('links'),
          },
        },
      ],
    },
  ],
}

export default CardsBlock
