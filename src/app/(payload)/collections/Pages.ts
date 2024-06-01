import slug from '../fields/slug'
import type { CollectionConfig } from 'payload/types'
import IndexHero, { Type as IndexHeroTypes } from '../blocks/IndexHero'
import BusList, { Type as BusListTypes } from '../blocks/BusList'

export type Layout = IndexHeroTypes | BusListTypes

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
      blocks: [IndexHero, BusList],
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
