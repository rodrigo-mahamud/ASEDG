import { Image } from '@/types/types'
import { Block } from 'payload'

interface SectionData {
  pretitle: string
  title: string
  text: string
  image: Image
}

export type Type = {
  sections: SectionData[]
}

const StickyTextImages: Block = {
  slug: 'stickytextimages',
  labels: {
    singular: 'Tarjeta con desplazamiento fijo ',
    plural: 'Tarjetas con desplazamiento fijo ',
  },

  fields: [
    {
      name: 'sections',
      type: 'array',
      label: ' ',
      minRows: 1,
      maxRows: 10,
      labels: {
        singular: 'Tarjeta',
        plural: 'Tarjetas',
      },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'pretitle',
              type: 'text',
              label: 'Pretitulo',
              required: true,
            },
            {
              name: 'title',
              type: 'text',
              label: 'Título',
              required: true,
            },
          ],
        },
        {
          name: 'text',
          type: 'textarea',
          label: 'Texto',
          required: true,
        },
        {
          name: 'image',
          type: 'upload',
          label: 'Imagen ',
          relationTo: 'media',
          required: true,
        },
      ],
    },
  ],
}

export default StickyTextImages
