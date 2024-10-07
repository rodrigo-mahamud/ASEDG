import { Block } from 'payload'

const StripeTPV: Block = {
  slug: 'stripetpv',
  labels: {
    singular: 'Pagos con Stripe',
    plural: 'Pagos con Stripe',
  },
  interfaceName: 'Pagos con Stripe',
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
      name: 'dni',
      type: 'text',
      required: true,
    },
    {
      name: 'correo',
      type: 'email',
      required: true,
    },
    {
      name: 'cantidad',
      type: 'number',
      required: true,
    },
    {
      name: 'fechaValidez',
      type: 'date',
      required: true,
    },
  ],
}
export default StripeTPV
