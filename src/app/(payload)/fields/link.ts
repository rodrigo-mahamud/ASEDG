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
          admin: {
            width: '50%',
          },
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
          admin: {
            width: '50%',
          },
          options: [
            {
              label: 'Básico',
              value: 'default',
            },
            {
              label: 'Secundario',
              value: 'ghost',
            },
            {
              label: 'Destacado',
              value: 'highlighted',
            },
            {
              label: 'Con Icono',
              value: 'expandIcon',
            },
            {
              label: 'Subrayado',
              value: 'linkHover1',
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
          name: 'icon',
          label: 'Icono',
          type: 'text',
          admin: {
            condition: (data, siblingData) => siblingData?.linkStyle.includes('expandIcon'),
            components: {
              Field: '@/app/(payload)/fields/Icons/Component',
            },
          },
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
      ],
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
