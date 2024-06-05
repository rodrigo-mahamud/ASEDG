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
          value: 'reference',
        },
        {
          label: 'Externo',
          value: 'custom',
        },
      ],
      defaultValue: 'reference', // "Interno" por defecto
      required: true,
    },
    {
      type: 'row',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Título',
          required: true,
        },
        {
          name: 'text',
          type: 'text',
          label: 'Descripción',
          required: false,
        },
      ],
    },
    {
      name: 'reference',
      label: 'Enlazar a la página:',
      type: 'relationship',
      relationTo: 'pages',
      required: true,
      admin: {
        condition: (data, siblingData) => siblingData?.linkType === 'reference',
      },
    },
    {
      name: 'url',
      label: 'Enlace externo:',
      type: 'text',
      required: true,
      admin: {
        condition: (data, siblingData) => siblingData?.linkType === 'custom',
      },
    },
  ],
}

export default link
