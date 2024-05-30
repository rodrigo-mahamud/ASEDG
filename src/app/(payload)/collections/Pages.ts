import type { CollectionConfig } from 'payload/types'
import IndexHero, { Type as IndexHeroTypes } from '../blocks/IndexHero'
import slug from '../fields/slug'

export type Layout = IndexHeroTypes

export const Pages: CollectionConfig = {
  slug: 'pages',
  versions: {
    drafts: true,
  },
  admin: {
    useAsTitle: 'title',
  },
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
      name: 'layout',
      type: 'blocks',
      blocks: [
        IndexHero,
        // otros bloques aquí
      ],
    },
    {
      name: 'publishedDate',
      admin: {
        position: 'sidebar',
      },
      type: 'date',
    },
    slug,
  ],
}
