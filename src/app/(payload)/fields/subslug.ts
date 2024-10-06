import { Field } from 'payload'
import formatSlug from '@/utils/formatSlug'

const subslug: Field = {
  name: 'subslug',
  label: 'Slug (Url de esta página)',
  required: true,
  type: 'text',
  admin: {
    position: 'sidebar',
  },
  hooks: {
    beforeValidate: [formatSlug('title')],
  },
}

export default subslug
