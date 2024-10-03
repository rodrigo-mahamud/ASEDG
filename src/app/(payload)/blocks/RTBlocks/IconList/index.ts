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
    singular: 'Bloque de Texto e Imágenes',
    plural: 'Bloques de Texto e Imágenes',
  },
  fields: [
    {
      name: 'list',
      type: 'array',
      maxRows: 3,
      label: 'Lista',
      fields: [
        Icon,
        {
          name: 'isblold',
          type: 'checkbox',
          label: 'Destacar en Negrita',
        },
        {
          name: 'text',
          type: 'text',
          label: 'Texto',
          required: true,
        },
      ],
      required: false,
    },
  ],
}

export default IconList
