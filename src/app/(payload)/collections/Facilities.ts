import { CollectionConfig } from 'payload'
import slug from '../fields/slug'
import { calculateTotalDays } from '@/utils/bookingDateFormat'

const daysOfWeek = [
  { label: 'Lunes', value: 'monday' },
  { label: 'Martes', value: 'tuesday' },
  { label: 'Miércoles', value: 'wednesday' },
  { label: 'Jueves', value: 'thursday' },
  { label: 'Viernes', value: 'friday' },
  { label: 'Sábado', value: 'saturday' },
  { label: 'Domingo', value: 'sunday' },
]

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
      name: 'schedule',
      label: 'Horario de apertura',
      type: 'array',
      maxRows: 2,
      fields: [
        {
          name: 'days',
          label: 'Días',
          type: 'select',
          hasMany: true,
          options: daysOfWeek,
          required: true,
          admin: {
            condition: (data, siblingData, { user }) => {
              const selectedDays = data.schedule
                ?.filter((item, index) => index !== siblingData.id)
                .flatMap((item) => item.days || [])

              return daysOfWeek.filter((day) => !selectedDays.includes(day.value))
            },
          },
        },
        {
          type: 'row',
          fields: [
            {
              name: 'open',
              label: 'Hora de Apertura',
              type: 'date',
              admin: {
                date: {
                  pickerAppearance: 'timeOnly',
                  displayFormat: 'HH:mm',
                  timeIntervals: 15,
                  timeFormat: 'HH:mm',
                },
              },
              required: true,
            },
            {
              name: 'close',
              label: 'Hora de Cierre',
              type: 'date',
              admin: {
                date: {
                  pickerAppearance: 'timeOnly',
                  displayFormat: 'HH:mm',
                  timeIntervals: 15,
                  timeFormat: 'HH:mm',
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
