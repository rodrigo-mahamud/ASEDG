import { Block } from 'payload/types'
import link from '../../fields/link'
interface LinkItem {
  linkText: string
  linkType: string
  description: string
  internal: string
  external: string
  location: string
  tel: string
  linkIcon: string
}
interface CardAttributes {
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
  cards: CardAttributes[]
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
      admin: {
        initCollapsed: true,
      },

      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'cardAtributes',
              type: 'select',
              label: 'Atributos de la Tarjeta',
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
              name: 'title',
              type: 'text',
              label: 'Título de la tarjeta',
              required: true,
            },
          ],
        },
        {
          name: 'description',
          type: 'textarea',
          label: 'Descripción de la tarjeta',
          required: true,
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
          type: 'group',
          label: ' ',

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
