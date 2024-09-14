// collections/Media.ts
import { CollectionConfig } from 'payload'

const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    description: 'Media files like images, videos, etc.',
  },
  upload: {
    staticDir: 'media',
    mimeTypes: ['image/*', 'application/pdf'],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
}

export default Media
