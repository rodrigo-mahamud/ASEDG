import type { Field } from 'payload'
import Icon from './Icons'

const link: Field = {
  name: 'link',
  labels: {
    singular: 'Enlace',
    plural: 'Enlaces',
  },
  label: ' ',
  type: 'array',
  admin: {
    initCollapsed: true,
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'linkType',
          label: 'Tipo de enlace',
          type: 'select',
          options: [
            {
              label: 'Enlace Interno',
              value: 'internal',
            },
            {
              label: 'Enlace Externo',
              value: 'external',
            },
            {
              label: 'Correo Electrónico',
              value: 'mail',
            },
            {
              label: 'Ubicación',
              value: 'location',
            },
            {
              label: 'Teléfono',
              value: 'tel',
            },
          ],
          defaultValue: 'internal', // "Interno" por defecto
          required: true,
        },
        {
          name: 'linkStyle',
          label: 'Estilo del enlace',
          type: 'select',
          options: [
            {
              label: 'Básico',
              value: 'basic',
            },
            {
              label: 'Secundario',
              value: 'secondary',
            },
            {
              label: 'Destacado',
              value: 'highlighted',
            },
            {
              label: 'Con Icono',
              value: 'withicon',
            },
            {
              label: 'Brillo',
              value: 'shine',
            },
          ],
          defaultValue: 'default', // "Interno" por defecto
          required: true,
        },
      ],
    },

    {
      type: 'row',
      fields: [
        {
          type: 'group',
          name: 'gIcon',
          label: '',
          admin: {
            className: 'iconFixUI',
            condition: (data, siblingData) => siblingData.linkStyle === 'withicon',
          },
          fields: [Icon],
        },
        {
          name: 'linkText',
          type: 'text',
          label: 'Texto del enlace',
          required: true,
          admin: {
            condition: (data, siblingData) =>
              ['internal', 'external'].includes(siblingData?.linkType),
          },
        },
        {
          name: 'mail',
          type: 'text',
          label: 'Email',
          required: true,
          admin: {
            condition: (data, siblingData) => siblingData?.linkType.includes('mail'),
          },
        },
        {
          name: 'location',
          type: 'text',
          label: 'Ubicación',
          required: true,
          admin: {
            condition: (data, siblingData) => siblingData?.linkType.includes('location'),
          },
        },
        {
          name: 'tel',
          type: 'text',
          label: 'Teléfono',
          required: true,
          admin: {
            condition: (data, siblingData) => siblingData?.linkType.includes('tel'),
          },
        },
      ],
    },
    {
      name: 'internal',
      label: 'Enlazar a la página',
      type: 'relationship',
      relationTo: 'pages',
      required: true,
      admin: {
        condition: (data, siblingData) => siblingData?.linkType === 'internal',
      },
    },
    {
      name: 'external',
      label: 'Enlace externo',
      type: 'text',
      required: true,
      admin: {
        condition: (data, siblingData) => siblingData?.linkType === 'external',
      },
    },
  ],
}

export default link
