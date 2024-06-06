import { Block } from 'payload/types'

interface TarjetaTypes {
  title: string
  description: string
  link: {
    slug: string
  }
  image: {
    url: string
    alt: string
  }
}

export type Type = {
  title: string
  description: string
  tarjeta: TarjetaTypes[]
}
const BentoBlock: Block = {
  slug: 'bentoblock',
  labels: {
    singular: 'Sección de Bento ',
    plural: 'Secciones de Bentos',
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
      name: 'tarjeta',
      label: ' ',
      minRows: 3,
      maxRows: 8,
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
              type: 'text',
              label: 'Descripción de la tarjeta',
              required: true,
            },
          ],
        },
        {
          name: 'link',
          label: 'Enlazar a la página:',
          type: 'relationship',
          relationTo: 'pages',
          required: true,
        },
        {
          name: 'image',
          type: 'upload',
          label: 'Imagen de la tarjeta',
          relationTo: 'media',
          required: true,
        },
      ],
    },
  ],
}

export default BentoBlock
