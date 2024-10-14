import type { CollectionConfig } from 'payload'

const Payments: CollectionConfig = {
  slug: 'payments',
  labels: {
    singular: 'Pago',
    plural: 'Pagos',
  },
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    { name: 'source', type: 'text' },
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'tpvname',
      type: 'text',
    },
    {
      name: 'surname',
      type: 'text',
    },
    {
      name: 'dni',
      type: 'text',
    },
    {
      name: 'email',
      type: 'email',
    },
    {
      name: 'amount',
      type: 'number',
      required: true,
    },
    {
      name: 'cardBrand',
      type: 'text',
    },
    {
      name: 'cardExpDate',
      type: 'text',
    },
    {
      name: 'cardNumbrer',
      type: 'text',
    },
    {
      name: 'transactionId',
      type: 'text',
      required: true,
    },
    {
      name: 'date',
      type: 'date',
      required: true,
    },
    {
      name: 'aditionalfields',
      type: 'json',
      label: 'Campos Adicionales',
    },
  ],
}
export default Payments
