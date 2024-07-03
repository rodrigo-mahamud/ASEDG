import { CollectionConfig } from 'payload/types'
import slug from '../fields/slug'
import RichText from '../blocks/RichText'

const Bookings: CollectionConfig = {
  slug: 'bookings',
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
        condition: (data) => data.bookingType === 'hourly',
      },
    },
    {
      name: 'fixedPrice',
      type: 'number',
      label: 'Precio fijo',
      admin: {
        condition: (data) => data.bookingType === 'fixed',
      },
    },
    {
      name: 'dailyOptions',
      type: 'array',
      label: 'Opciones por días',
      admin: {
        condition: (data) => data.bookingType === 'daily',
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
    slug,
    {
      name: 'publishedDate',
      label: 'Fecha de publicación',
      type: 'date',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
  ],
}

export default Bookings
