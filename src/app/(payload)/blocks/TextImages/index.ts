import { Block } from 'payload'
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
  text: string
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
const TextImagesBlock: Block = {
  slug: 'textimagesblock',
  labels: {
    singular: 'Bloque de Texto e Imágenes',
    plural: 'Bloques de Texto e Imágenes',
  },
  fields: [
    {
      name: 'isReversed',
      type: 'checkbox',
      label: 'Invertir Diseño',
      required: false,
    },

    {
      name: 'title',
      type: 'text',
      label: 'Título',
      required: true,
    },
    {
      name: 'text',
      type: 'richText',
      label: 'Cuerpo',
      admin: {
        className: 'richTextEmbed',
      },
      required: true,
    },

    {
      name: 'image',
      type: 'upload',
      label: 'Imagen',
      relationTo: 'media',
      required: true,
    },
  ],
}

export default TextImagesBlock
