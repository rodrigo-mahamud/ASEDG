import { Field } from 'payload'
import formatSlug from '@/utils/formatSlug'

const slug: Field = {
  name: 'slug',
  label: 'Slug (Url de esta página)',
  required: true,
  type: 'text',
  admin: {
    position: 'sidebar',
    condition: (_, siblingData) => siblingData.pageType === 'normalPage',
  },

  hooks: {
    beforeValidate: [formatSlug('title')],
  },
}

export default slug
