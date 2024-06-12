import { Block } from 'payload/types'
import IconField from '../../fields/Icons/Component'
import Icon from '../../fields/Icons'
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
  isReversed: boolean
  title: string
  body: string
  image: {
    url: string
    alt: string
  }
  list: ListTypes[]
  linkText: string
  link?: {
    slug: string
  }
}
const Title: Block = {
  slug: 'textimagesblock',
  labels: {
    singular: 'Bloque de Texto e Imágenes',
    plural: 'Bloques de Texto e Imágenes',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Título',
      required: true,
    },
    {
      name: 'subtitle',
      type: 'text',
      label: 'Subtitulo',
      required: true,
    },
  ],
}

export default Title
