import { CollectionConfig } from 'payload'
import slug from '../fields/slug'
import { Views } from 'react-big-calendar'
import SportsDashboard from '@/components/payload/SportsDashboard'

const Sports: CollectionConfig = {
  slug: 'sports',
  labels: {
    singular: 'Deportes',
    plural: 'Deportes',
  },
  admin: {
    components: {
      views: {
        List: SportsDashboard, // highlight-line
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
