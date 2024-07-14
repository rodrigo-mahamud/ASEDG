import { CollectionConfig } from 'payload'
import slug from '../fields/slug'
import Custom from '@/components/payload/Custom'

const Sports: CollectionConfig = {
  slug: 'sports',
  labels: {
    singular: 'Instalaciones',
    plural: 'Instalaciones',
  },

  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Título',
      required: true,
    },
    slug,
  ],
}

export default Sports
