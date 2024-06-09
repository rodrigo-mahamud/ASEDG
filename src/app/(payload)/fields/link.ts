import type { Field } from 'payload/types'

const link: Field = {
  name: 'link',
  label: ' ',

  type: 'group',
  fields: [
    {
      name: 'linkStyle',
      label: 'Estilo del enlace',
      type: 'radio',
      options: [
        {
          label: 'Con texto',
          value: 'text',
        },
        {
          label: 'Icono',
          value: 'icon',
        },
      ],
      defaultValue: 'text', // "Interno" por defecto
      required: true,
    },

    {
      name: 'linkType',
      label: 'Tipo de enlace',
      type: 'select',
      options: [
        {
          label: 'Interno',
          value: 'internal',
        },
        {
          label: 'Externo',
          value: 'external',
        },
        {
          label: 'Correo Electrónico',
          value: 'mail',
        },
        {
          label: 'ubicación',
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
      type: 'row',
      fields: [
        {
          name: 'linkText',
          type: 'text',
          label: 'Texto del enlace',
          required: true,
          admin: {
            condition: (data, siblingData) => siblingData?.linkStyle.includes('text'),
          },
        },
        {
          name: 'linkIcon',
          type: 'text',
          label: 'Icono del enlace',
          required: true,
          admin: {
            condition: (data, siblingData) => siblingData?.linkStyle.includes('icon'),
          },
        },
        {
          name: 'description',
          type: 'text',
          label: 'Descripción del enlace',
          required: false,
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
      label: 'Ubicacion:',
      required: true,
      admin: {
        condition: (data, siblingData) => siblingData?.linkType.includes('location'),
      },
    },
    {
      name: 'tel',
      type: 'text',
      label: 'Telefono:',
      required: true,
      admin: {
        condition: (data, siblingData) => siblingData?.linkType.includes('tel'),
      },
    },
    {
      name: 'internal',
      label: 'Enlazar a la página:',
      type: 'relationship',
      relationTo: 'pages',
      required: true,
      admin: {
        condition: (data, siblingData) => siblingData?.linkType === 'internal',
      },
    },
    {
      name: 'external',
      label: 'Enlace externo:',
      type: 'text',
      required: true,
      admin: {
        condition: (data, siblingData) => siblingData?.linkType === 'external',
      },
    },
  ],
}

export default link
