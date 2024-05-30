import type { Field } from 'payload/types'
import deepMerge from '../utils/deepMerge'

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

type AppearanceOptionKeys = keyof typeof appearanceOptions

export type ButtonType = (options?: {
  appearances?: AppearanceOptionKeys[] | false
  disableLabel?: boolean
  overrides?: Record<string, unknown>
}) => Field

const button: ButtonType = ({
  appearances = ['default', 'primary', 'secondary'],
  disableLabel = false,
  overrides = {},
} = {}) => {
  const buttonResult: Field = {
    name: 'button',
    admin: {
      hideGutter: true,
    },
    fields: [
      {
        fields: [
          {
            name: 'type',
            admin: {
              layout: 'horizontal',
              width: '50%',
            },
            defaultValue: 'reference',
            options: [
              {
                label: 'Internal Button',
                value: 'reference',
              },
              {
                label: 'Custom URL',
                value: 'custom',
              },
            ],
            type: 'radio',
          },
          {
            name: 'newTab',
            admin: {
              style: {
                alignSelf: 'flex-end',
              },
              width: '50%',
            },
            label: 'Open in new tab',
            type: 'checkbox',
          },
        ],
        type: 'row',
      },
    ],
    type: 'group',
  }

  const buttonTypes: Field[] = [
    {
      name: 'reference',
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'reference',
      },
      label: 'Document to link to',
      maxDepth: 1,
      relationTo: ['pages'],
      required: true,
      type: 'relationship',
    },
    {
      name: 'url',
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'custom',
      },
      label: 'Custom URL',
      required: true,
      type: 'text',
    },
  ]

  if (!disableLabel) {
    buttonTypes.map((buttonType) => ({
      ...buttonType,
      admin: {
        ...buttonType.admin,
        width: '50%',
      },
    }))

    buttonResult.fields.push({
      fields: [
        ...buttonTypes,
        {
          name: 'label',
          admin: {
            width: '50%',
          },
          label: 'Label',
          required: true,
          type: 'text',
        },
      ],
      type: 'row',
    })
  } else {
    buttonResult.fields = [...buttonResult.fields, ...buttonTypes]
  }

  if (appearances !== false) {
    let appearanceOptionsToUse = [
      appearanceOptions.default,
      appearanceOptions.primary,
      appearanceOptions.secondary,
    ]

    if (Array.isArray(appearances)) {
      appearanceOptionsToUse = appearances.map(
        (appearance) => appearanceOptions[appearance as AppearanceOptionKeys],
      )
    }

    buttonResult.fields.push({
      name: 'appearance',
      admin: {
        description: 'Choose how the button should be rendered.',
      },
      defaultValue: 'default',
      options: appearanceOptionsToUse,
      type: 'select',
    })
  }

  return deepMerge(buttonResult, overrides)
}

export default button
