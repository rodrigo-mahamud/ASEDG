import { Block } from 'payload/types'
import link from '../../fields/link'
export type Type = {
  style: string
  title: string
  text: string
  link: {
    slug: string
  }
  image?: {
    url: string
    alt: string
  }
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
      type: 'row',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Título',
          required: true,
        },
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
      ],
    },
    {
      name: 'text',
      type: 'textarea',
      label: 'Texto',
      required: true,
    },
    link,
    {
      name: 'image',
      type: 'upload',
      label: 'Imagen',
      relationTo: 'media',
      required: false,
    },
  ],
}

export default CallToAction
