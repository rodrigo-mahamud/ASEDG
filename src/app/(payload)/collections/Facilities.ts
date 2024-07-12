import { CollectionConfig } from 'payload'
import slug from '../fields/slug'
import RichText from '../blocks/RichText'

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
      ],
    },

    slug,
  ],
}

export default Facilities
