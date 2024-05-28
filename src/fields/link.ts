import type { Field } from 'payload/types'
import deepMerge from '@/utils/deepMerge'

export const appearanceOptions = {
  default: {
    label: 'Default',
    value: 'default',
  },
  primary: {
    label: 'Primary Button',
    value: 'primary',
  },
  secondary: {
    label: 'Secondary Button',
    value: 'secondary',
  },
}

export type LinkAppearances = 'default' | 'primary' | 'secondary'

type LinkType = (options?: {
  appearances?: LinkAppearances[] | false
  disableLabel?: boolean
  overrides?: Record<string, unknown>
}) => Field

const link: LinkType = ({ appearances, disableLabel = false, overrides = {} } = {}) => {
  const linkResult: Field = {
    name: 'linkGroup',
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

  if (appearances !== false) {
    let appearanceOptionsToUse = [
      appearanceOptions.default,
      appearanceOptions.primary,
      appearanceOptions.secondary,
    ]

    if (appearances) {
      appearanceOptionsToUse = appearances.map((appearance) => appearanceOptions[appearance])
    }

    linkResult.fields.push({
      name: 'appearance',
      admin: {
        description: 'Choose how the link should be rendered.',
      },
      defaultValue: 'default',
      options: appearanceOptionsToUse,
      type: 'select',
    })
  }

  linkResult.fields.push({
    name: 'childLinks',
    label: 'Enlaces',
    labels: {
      plural: 'Enlaces',
      singular: 'Enlace',
    },
    type: 'array',
    fields: [
      {
        name: 'title',
        type: 'text',
        label: 'Title',

        required: true,
      },
      {
        name: 'text',
        type: 'text',
        label: 'Text',
        required: true,
      },
      {
        name: 'highlighted',
        type: 'checkbox',
        label: 'Highlighted',
      },
      {
        name: 'linkType',
        type: 'radio',
        options: [
          {
            label: 'Internal link',
            value: 'reference',
          },
          {
            label: 'Custom URL',
            value: 'custom',
          },
        ],
        defaultValue: 'reference',
        label: 'Link Type',
      },
      {
        name: 'reference',
        admin: {
          condition: (_, siblingData) => siblingData?.linkType === 'reference',
        },
        label: 'Enlace a: ',
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
        label: 'Custom URL',
        required: true,
        type: 'text',
      },
    ],
  })

  return deepMerge(linkResult, overrides)
}

export default link
