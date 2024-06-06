import { Block } from 'payload/types'
import link from '../../fields/link'
export type Type = {
  style: string
  title: string
  text: string
  link: {
    linkText?: string
    description: string
    internal?: {
      slug?: string
    }
    external?: {
      slug?: string
    }
  }
  speed: number
  decoration?: boolean
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
      name: 'speed',
      type: 'number',
      label: 'Velocidad de efecto parallax. (1.15 por defecto)',
      required: false,
    },
    {
      name: 'decoration',
      type: 'checkbox',
      label: '¿Añadir decoración al fondo?',
      required: false,
    },
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
