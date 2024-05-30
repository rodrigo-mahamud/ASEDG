// collections/Media.ts
import { CollectionConfig } from 'payload/types'

const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    description: 'Media files like images, videos, etc.',
  },
  upload: {
    staticDir: 'media',
    mimeTypes: ['image/*'],
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
