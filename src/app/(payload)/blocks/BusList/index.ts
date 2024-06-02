import { Block } from 'payload/types'
interface BusesDataType {
  from: string
  fromRoad: string
  fromHour: string
  to: string
  toRoad: string
  toHour: string
  companyImg: string
}
export type Type = {
  buses: BusesDataType[]
}
const BusList: Block = {
  slug: 'buslist',
  fields: [
    {
      name: 'buses',
      type: 'array',
      label: 'Buses',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'from',
              type: 'text',
              label: 'From',
              required: true,
            },
            {
              name: 'fromRoad',
              type: 'text',
              label: 'From Road',
              required: true,
            },
            {
              name: 'fromHour',
              type: 'text',
              label: 'From Hour',
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
              label: 'To',
              required: true,
            },
            {
              name: 'toRoad',
              type: 'text',
              label: 'To Road',
              required: true,
            },
            {
              name: 'toHour',
              type: 'text',
              label: 'To Hour',
              required: true,
            },
          ],
        },
        {
          name: 'companyImg',
          type: 'upload',
          label: 'Company Image',
          relationTo: 'media', // Suponiendo que tienes una colección de medios llamada 'media'
          required: true,
        },
      ],
    },
  ],
}

export default BusList
