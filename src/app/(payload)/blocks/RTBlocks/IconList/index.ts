import { Block } from 'payload'
import Icon from '../../../fields/Icons'
interface ListTypes {
  text: string
  isblold: boolean
  icon: string
  listImage: {
    url: string
    alt: string
  }
}
interface BlockTypes {
  list: ListTypes[]
}

export type Type = {
  block: BlockTypes
}
const IconList: Block = {
  slug: 'iconlist',
  labels: {
    singular: 'Lista con iconos',
    plural: 'Listas con iconos',
  },
  fields: [
    {
      name: 'list',
      type: 'array',
      maxRows: 9,
      label: ' ',
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: 'isblold',
          type: 'checkbox',
          label: 'Destacar en Negrita',
        },
        {
          type: 'row',
          fields: [
            Icon,
            {
              name: 'text',
              type: 'text',
              label: 'Texto',
              required: true,
            },
          ],
        },
      ],
      required: false,
    },
  ],
}

export default IconList
