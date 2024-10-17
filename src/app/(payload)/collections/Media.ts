// collections/Media.ts
import { CollectionConfig } from 'payload'

const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    description: 'Media files like images, videos, etc.',
  },
  access: {
    read: () => true, // Esto permite el acceso de lectura público
  },
  upload: {
    staticDir: 'media',
    imageSizes: [
      {
        name: 'thumbnail',
        width: 10,
        height: 10,

        formatOptions: {
          format: 'webp',
          options: {
            quality: 2,
          },
        },

        generateImageName: ({ height, sizeName, extension, width, originalName }) => {
          return `${originalName}-${sizeName}${height}X${width}.${extension}`
        },
      },
    ],

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
