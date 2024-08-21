import { CollectionConfig } from 'payload'
import slug from '../fields/slug'

const Sports: CollectionConfig = {
  slug: 'sports',
  labels: {
    singular: 'Deportes',
    plural: 'Deportes',
  },
  admin: {
    components: {
      views: {
        list: {
          Component: '@/components/payload/SportsDashboard',
        },
      },
    },
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
