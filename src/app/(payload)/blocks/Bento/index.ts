import { Block } from 'payload/types'
interface TarjetaTypes {
  title: string
  description: string
  image: {
    url: string
    alt: string
  }
}

export type Type = {
  tarjeta: TarjetaTypes[]
}
const BentoBlock: Block = {
  slug: 'bentoblock',
  labels: {
    singular: 'Sección de Bento Grid',
    plural: 'Sección de Bento Grid',
  },
  fields: [
    {
      type: 'array',
      name: 'tarjeta',
      label: ' ',
      maxRows: 7,
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
              label: 'Título',
              required: true,
            },
            {
              name: 'description',
              type: 'text',
              label: 'Descripción',
              required: true,
            },
          ],
        },
        {
          name: 'image',
          type: 'upload',
          label: 'Imagen',
          relationTo: 'media',
          required: true,
        },
      ],
    },
  ],
}

export default BentoBlock
