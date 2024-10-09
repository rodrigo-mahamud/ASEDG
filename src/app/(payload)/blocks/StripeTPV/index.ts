import { Block } from 'payload'
import Icon from '../../fields/Icons'

const StripeTPV: Block = {
  slug: 'stripetpv',
  labels: {
    singular: 'Pagos con StripeTPV',
    plural: 'Pagos con Stripe',
  },
  interfaceName: 'Pagos con Stripe',
  fields: [
    {
      type: 'row',
      fields: [
        {
          type: 'text',
          name: 'cardTitle',
          label: 'Titulo',
          required: true,
        },
        Icon,
        {
          name: 'buttonText',
          type: 'text',
          label: 'Texto del Botón',
          required: true,
        },
      ],
    },
    {
      type: 'textarea',
      name: 'cardDescription',
      label: 'Descrición',
      required: true,
    },
    {
      type: 'array',
      name: 'cardIncluded',
      label: ' ',
      labels: {
        singular: 'Característica',
        plural: 'Características',
      },
      required: true,
      fields: [
        {
          type: 'row',
          fields: [
            Icon,
            {
              name: 'text',
              type: 'text',
              label: 'Texto',
              required: true,
            },
          ],
        },
      ],
    },
    {
      type: 'group',
      name: 'stripeInfo',
      label: 'Formulario de pago',
      fields: [
        {
          type: 'row',
          fields: [
            {
              type: 'number',
              name: 'price',
              label: 'Precio',
              required: true,
            },
            {
              name: 'expirationDate',
              label: 'Valido hasta el',
              type: 'date',
              admin: {
                date: {
                  pickerAppearance: 'dayAndTime',
                  displayFormat: 'd MMM yyy',
                  timeIntervals: 15,
                  timeFormat: 'HH:mm',
                },
              },
              required: true,
            },
          ],
        },
        {
          type: 'array',
          name: 'stripefields',
          admin: {
            initCollapsed: true,
          },
          label: ' ',
          labels: {
            singular: 'Campo del formulario',
            plural: 'Campos del formulario',
          },
          fields: [
            {
              type: 'row',
              fields: [
                {
                  type: 'text',
                  name: 'fieldLabel',
                  label: 'Nombre del campo',
                  required: true,
                },
                {
                  type: 'select',
                  name: 'fieldType',
                  label: 'Tipo de campo',
                  options: [
                    {
                      label: 'Texto',
                      value: 'text',
                    },
                    {
                      label: 'Numero',
                      value: 'number',
                    },
                    {
                      label: 'DNI',
                      value: 'idCard',
                    },
                    {
                      label: 'Email',
                      value: 'mail',
                    },
                  ],
                  defaultValue: 'text',
                  required: true,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
export default StripeTPV
