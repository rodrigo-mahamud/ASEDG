import type { Field } from 'payload/types'
import deepMerge from '@/app/(payload)/utils/deepMerge'
import validateMaxAllowed from '@/app/(payload)/hooks/validateMaxAllowed'

// Definir el tipo para la función LinkType
interface LinkType {
  (options?: { disableLabel?: boolean; overrides?: Record<string, unknown> }): Field
}

// Crear la función LinkType
const headerLink: LinkType = ({ overrides = {} } = {}) => {
  const linkResult: Field = {
    name: 'item',
    label: ' ',
    admin: {
      hideGutter: true,
    },
    fields: [
      {
        name: 'label',
        type: 'text',
        label: 'Nombre del grupo',
        required: true,
      },
    ],
    type: 'group',
  }

  // Definir el campo de enlaces
  linkResult.fields.push({
    name: 'child',
    label: 'Enlaces',
    labels: {
      plural: 'Enlaces',
      singular: 'Enlace',
    },
    type: 'array',
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
        defaultValue: 'reference',
      },
      {
        type: 'row',
        fields: [
          {
            name: 'title',
            type: 'text',
            admin: {
              className: 'hola',
            },
            label: 'Titulo',
            required: true,
          },
          {
            name: 'text',
            type: 'text',
            label: 'Descripción',
            required: true,
          },
        ],
      },
      {
        name: 'reference',
        admin: {
          condition: (_, siblingData) => siblingData?.linkType === 'reference',
        },
        label: 'Enlazar a la página: ',
        maxDepth: 1,
        relationTo: ['pages'],
        required: true,
        type: 'relationship',
      },
      {
        name: 'url',
        admin: {
          condition: (_, siblingData) => siblingData?.linkType === 'custom',
        },
        label: 'Enlace externo:',
        required: true,
        type: 'text',
      },
      {
        name: 'highlighted',
        type: 'checkbox',
        label: 'Destacar este enlace',
        // hooks: {
        //   beforeChange: [
        //     validateMaxAllowed({ field: 'highlighted', max: 1, collectionSlug: 'link' }),
        //   ],
        // },
      },
    ],
  })

  return deepMerge(linkResult, overrides)
}

export default headerLink
