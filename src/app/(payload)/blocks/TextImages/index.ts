import { Block } from 'payload/types'
export type Types = {
  isReversed: string
  title: string
  body: string
  image: string
  list: {
    icon: string
    text: string
  }
  linkText: string
  link: string
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
      name: 'body',
      type: 'textarea',
      label: 'Cuerpo',
      required: true,
    },
    {
      type: 'row',
      fields: [
        {
          name: 'linkText',
          type: 'text',
          label: 'Texto del Enlace',
          required: true,
        },
        {
          name: 'link',
          type: 'relationship',
          label: 'Enlace',
          relationTo: 'pages',
          required: true,
        },
      ],
    },
    {
      name: 'image',
      type: 'upload',
      label: 'Imagen',
      relationTo: 'media',
      required: true,
    },

    {
      name: 'list',
      type: 'array',
      maxRows: 3,
      label: 'Lista',
      fields: [
        {
          name: 'icon',
          type: 'text',
          label: 'Icono',
          required: true,
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

export default TextImagesBlock
