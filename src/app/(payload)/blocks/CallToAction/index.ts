import { Block } from 'payload/types'
export type Type = {
  style: string
  title: string
  text: string
  link: {
    slug: string
  }
  img: string
  linkText: string
}
const CallToAction: Block = {
  slug: 'calltoaction',
  labels: {
    singular: 'Llamada a la Acción',
    plural: 'Llamadas a la Acción',
  },
  fields: [
    {
      name: 'style',
      type: 'select',
      label: 'Estilo',
      options: [
        {
          label: 'Izquierda',
          value: 'left',
        },
        {
          label: 'Centro',
          value: 'center',
        },
      ],
      required: true,
    },
    {
      name: 'title',
      type: 'text',
      label: 'Título',
      required: true,
    },
    {
      name: 'text',
      type: 'textarea',
      label: 'Texto',
      required: true,
    },
    {
      name: 'link',
      type: 'relationship',
      label: 'Enlace',
      relationTo: 'pages',
      required: true,
    },
    {
      name: 'img',
      type: 'upload',
      label: 'Imagen',
      relationTo: 'media',
      required: false,
    },
    {
      name: 'linkText',
      type: 'text',
      label: 'Texto del Enlace',
      required: true,
    },
  ],
}

export default CallToAction
