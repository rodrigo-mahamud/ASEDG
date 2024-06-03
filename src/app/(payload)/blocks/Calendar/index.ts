import { Block } from 'payload/types'

const CalendarBlock: Block = {
  slug: 'calendarblock',
  labels: {
    singular: 'Calendario',
    plural: 'Calendario',
  },
  fields: [
    {
      type: 'array',
      name: 'events',
      label: ' ',
      labels: {
        singular: 'Evento',
        plural: 'Eventos',
      },
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
              label: 'Titulo del Evento',
            },
            {
              name: 'location',
              type: 'text',
              required: true,
              label: 'Ubicación',
            },
          ],
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
          label: 'Descripción',
        },
        {
          type: 'row',
          fields: [
            {
              name: 'start',
              type: 'date',
              required: true,
              label: 'Fecha de inicio',
            },
            {
              name: 'end',
              type: 'date',
              required: true,
              label: 'Fecha de fin',
            },
          ],
        },

        {
          name: 'img',
          type: 'upload',
          relationTo: 'media', // Assuming you have a media collection for image uploads
          required: true,
          label: 'Imagen del evento',
        },
      ],
    },
  ],
}

export default CalendarBlock
