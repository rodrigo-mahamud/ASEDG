import { Block } from 'payload'
interface BusTypes {
  from: string
  fromRoad: string
  fromHour: string
  to: string
  toRoad: string
  toHour: string
  companyImg: {
    url: string
    alt: string
  }
}
export type Type = {
  buses: BusTypes[]
}
const BusList: Block = {
  slug: 'buslist',
  interfaceName: 'Autobus',
  labels: {
    singular: 'Lista de Autobuses',
    plural: 'Lista de Autobuses',
  },
  fields: [
    {
      type: 'array',
      name: 'buses',
      label: ' ',
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'from',
              type: 'text',
              label: 'Población de SALIDA ',
              required: true,
            },
            {
              name: 'fromRoad',
              type: 'text',
              label: 'Ubicación de SALIDA',
              required: true,
            },
            {
              name: 'fromHour',
              type: 'text',
              label: 'Hora de SALIDA',
              required: true,
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'to',
              type: 'text',
              label: 'Población de LLEGADA',
              required: true,
            },
            {
              name: 'toRoad',
              type: 'text',
              label: 'Ubicación de LLEGADA',
              required: true,
            },
            {
              name: 'toHour',
              type: 'text',
              label: 'Hora de LLEGADA',
              required: true,
            },
          ],
        },
        {
          name: 'companyImg',
          type: 'upload',
          label: 'Logo de la empresa',
          relationTo: 'media', // Suponiendo que tienes una colección de medios llamada 'media'
          required: true,
        },
      ],
    },
  ],
}

export default BusList
