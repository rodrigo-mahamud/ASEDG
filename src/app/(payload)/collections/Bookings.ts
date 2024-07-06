import { CollectionConfig } from 'payload'
const Bookings: CollectionConfig = {
  slug: 'bookings',
  labels: {
    singular: 'Reserva',
    plural: 'Reservas',
  },
  admin: {
    useAsTitle: 'email',
  },
  fields: [
    {
      name: 'nombre',
      type: 'text',
      required: true,
    },
    {
      name: 'apellidos',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'telefono',
      type: 'text',
      required: true,
    },
    {
      name: 'edad',
      type: 'number',
      required: true,
    },
    {
      name: 'dni',
      type: 'text',
      required: true,
    },
    {
      name: 'periodo',
      type: 'number',
      required: true,
    },
    {
      name: 'fechaInicio',
      type: 'date',
      required: true,
    },
    {
      name: 'fechaFin',
      type: 'date',
      required: true,
    },
    {
      name: 'pinCode',
      type: 'text',
      required: true,
    },
    {
      name: 'terminos',
      type: 'checkbox',
      required: true,
    },
  ],
}

export default Bookings
