import { CollectionConfig } from 'payload/types'
import slug from '../fields/slug'
import RichText from '../blocks/RichText'

const Bookings: CollectionConfig = {
  slug: 'bookings',
  labels: {
    singular: 'Reserva',
    plural: 'Reservas',
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
          relationTo: 'media', // Asegúrate de tener una colección 'media' configurada para subir imágenes
          label: 'Imagen',
        },
      ],
    },
    {
      name: 'publishedDate',
      label: 'Fecha de publicación',
      type: 'date',
      required: true,
    },
    slug,
  ],
}

export default Bookings
