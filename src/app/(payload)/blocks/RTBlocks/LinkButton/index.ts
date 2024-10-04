import { Block } from 'payload'

import link from '@/app/(payload)/fields/link'
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
const LinkButton: Block = {
  slug: 'linkbutton',
  labels: {
    singular: 'Boton de enlace',
    plural: 'Botones de enlace',
  },
  fields: [link],
}

export default LinkButton
