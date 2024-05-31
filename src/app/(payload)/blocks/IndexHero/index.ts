// blocks/IndexHero.ts
import { Block } from 'payload/types'
import link from '../../fields/link'
import buton, { ButtonType as butonTypes } from '../../fields/button'

export type Type = {
  buton: butonTypes
  blockType: 'indexhero'
}

const IndexHero: Block = {
  slug: 'indexhero',

  labels: {
    singular: 'Index Hero',
    plural: 'Index Heroes',
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'title',
          label: 'Titulo',
          type: 'text',
          required: true,
        },
        {
          name: 'pretitle',
          label: 'Pretitulo',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'description',
      label: 'Descripción',
      type: 'textarea',
      admin: {
        width: '100%',
      },
      required: true,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'buttons',
      type: 'array',
      fields: [buton()],
    },
  ],
}

export default IndexHero
