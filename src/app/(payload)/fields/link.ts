import type { Field } from 'payload/types'

const link: Field = {
  name: 'link',
  label: ' ',

  type: 'group',
  fields: [
    {
      name: 'linkType',
      label: 'Tipo de enlace',
      type: 'radio',
      options: [
        {
          label: 'Interno',
          value: 'internal',
        },
        {
          label: 'Externo',
          value: 'external',
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
