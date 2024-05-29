import type { CollectionConfig } from 'payload/types'

export const Pages: CollectionConfig = {
  fields: [
    {
      name: 'title',
      required: true,
      type: 'text',
    },
    {
      name: 'content',
      required: true,
      type: 'text',
    },
    {
      name: 'publishedDate',
      admin: {
        position: 'sidebar',
      },
      type: 'date',
    },
  ],
  slug: 'pages',
  versions: {
    drafts: true,
  },
}
