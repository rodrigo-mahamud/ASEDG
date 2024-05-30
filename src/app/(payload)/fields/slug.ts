import { Field } from 'payload/types'
import formatSlug from '../utils/formatSlug'

const slug: Field = {
  name: 'slug',
  label: 'Slug',
  required: true,
  type: 'text',
  admin: {
    position: 'sidebar',
  },
  hooks: {
    beforeValidate: [formatSlug('title')],
  },
}

export default slug
