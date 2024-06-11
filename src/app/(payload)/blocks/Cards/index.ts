import { Block } from 'payload/types'
import link from '../../fields/link'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'

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
      name: 'filter',
      type: 'checkbox',
      label: 'Filtrar por categorías',
      admin: {},
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
                  label: 'Enlaces',
                  value: 'links',
                },
                {
                  label: 'Categorías',
                  value: 'cat',
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
          relationTo: 'media',
          required: true,
          admin: {
            condition: (data, siblingData) => siblingData?.cardAtributes?.includes('image'),
          },
        },
        {
          name: 'categories',
          label: 'Categorías',
          type: 'relationship',
          relationTo: 'cat',
          hasMany: true,
          required: true,
          maxRows: 2,
          admin: {
            condition: (data, siblingData) => siblingData?.cardAtributes?.includes('cat'),
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
