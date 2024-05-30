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
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'subtitle',
      type: 'textarea',
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
