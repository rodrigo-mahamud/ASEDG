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

  fields: [
    {
      name: 'sections',
      type: 'array',
      label: ' ',
      minRows: 1,
      maxRows: 10,
      labels: {
        singular: 'Section',
        plural: 'Sections',
      },
      fields: [
        {
          name: 'pretitle',
          type: 'text',
          label: 'Pre-title',
          required: true,
        },
        {
          name: 'title',
          type: 'text',
          label: 'Title',
          required: true,
        },
        {
          name: 'text',
          type: 'textarea',
          label: 'Text',
          required: true,
        },
        {
          name: 'image',
          type: 'upload',
          label: 'Image',
          relationTo: 'media',
          required: true,
        },
      ],
    },
  ],
}

export default StickyTextImages
