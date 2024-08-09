import { CollectionConfig } from 'payload'
import slug from '../fields/slug'

import { calculateTotalDays } from '@/utils/bookingDateFormat' // Asumimos que crearemos este hook

const Facilities: CollectionConfig = {
  slug: 'facilities',
  labels: {
    singular: 'Instalaciones',
    plural: 'Instalaciones',
  },
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Título',
      required: true,
    },
    {
      name: 'summary',
      type: 'textarea',
      label: 'Resumen',
      required: true,
    },
    {
      name: 'images',
      type: 'array',
      label: 'Imágenes cabecera.',
      admin: {
        initCollapsed: true,
      },
      maxRows: 5,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Imagen',
        },
      ],
    },
    {
      name: 'bookingOptions',
      type: 'array',
      label: 'Opciones de reserva',
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: 'periodType',
          type: 'select',
          label: 'Tipo de Reserva',
          options: [
            { label: 'Precio fijo', value: 'fixed' },
            { label: 'Por Horas', value: 'hours' },
            { label: 'Por Días', value: 'days' },
            { label: 'Por Meses', value: 'months' },
          ],
          required: true,
        },
        {
          type: 'row',
          fields: [
            {
              name: 'name',
              type: 'text',
              label: 'Nombre',
              required: true,
            },
            {
              name: 'periodLength',
              type: 'number',
              label: 'Cantidad',
              required: true,
              admin: {
                condition: (data, siblingData) => siblingData.periodType !== 'fixed',
              },
            },
            {
              name: 'price',
              type: 'number',
              label: 'Precio en €',
              required: true,
            },
          ],
        },
        {
          name: 'daysAmount',
          type: 'number',
          label: 'Días totales',
          admin: {
            readOnly: true,
            hidden: true,
          },
        },
      ],
    },
    {
      name: 'schedule', // required
      label: 'Horario de apertura',
      type: 'group', // required
      interfaceName: 'Horario de apertura', // optional
      fields: [
        {
          name: 'location',
          type: 'point',
          label: 'Location',
        },
        {
          type: 'row',

          fields: [
            {
              name: 'monday',
              label: 'Lunes -',
              type: 'date',
              admin: {
                date: {
                  overrides: { dateFormat: 'kk:mm:ss' },
                  pickerAppearance: 'timeOnly',
                  displayFormat: 'HH:mm',
                },
              },
              required: true,
            },
            {
              name: 'tuesday',
              label: 'Martes',
              type: 'date',
              admin: {
                date: {
                  pickerAppearance: 'timeOnly',
                  displayFormat: 'HH:mm',
                },
              },
              required: true,
            },
          ],
        },
      ],
    },
    slug,
  ],
  hooks: {
    beforeChange: [
      ({ data }) => {
        if (data.bookingOptions) {
          data.bookingOptions = data.bookingOptions.map((option: any) => ({
            ...option,
            daysAmount: calculateTotalDays(option.periodType, option.periodLength),
          }))
        }
        return data
      },
    ],
  },
}

export default Facilities
