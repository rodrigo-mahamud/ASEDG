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
export type Type = {
  list: ListTypes[]
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
      maxRows: 3,
      label: ' ',
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
