import { CollectionConfig } from 'payload/types'
import slug from '../fields/slug'
import RichText from '../blocks/RichText'

const Bookings: CollectionConfig = {
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
      name: 'bookingData',
      type: 'group',
      label: 'Ajustes de la reserva',
      fields: [
        {
          name: 'bookingType',
          type: 'select',
          label: 'Tipo de reserva',
          options: [
            {
              label: 'Por horas',
              value: 'hourly',
            },
            {
              label: 'Por días',
              value: 'daily',
            },
            {
              label: 'Precio fijo',
              value: 'fixed',
            },
          ],
          required: true,
        },
        {
          name: 'hourlyRate',
          type: 'number',
          label: 'Precio por hora',
          admin: {
            condition: (data) => data.bookingData.bookingType === 'hourly',
          },
        },
        {
          name: 'fixedPrice',
          type: 'number',
          label: 'Precio fijo',
          admin: {
            condition: (data) => data.bookingData.bookingType === 'fixed',
          },
        },
        {
          name: 'dailyOptions',
          type: 'array',
          label: 'Opciones por días',
          admin: {
            condition: (data) => data.bookingData.bookingType === 'daily',
            initCollapsed: true,
          },
          maxRows: 5,
          fields: [
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
                  name: 'days',
                  type: 'number',
                  label: 'Días de duración',
                  required: true,
                },
                {
                  name: 'price',
                  type: 'number',
                  label: 'Precio en €',
                  required: true,
                },
              ],
            },
          ],
        },
      ],
    },
    slug,
  ],
}

export default Bookings
