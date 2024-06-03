import slug from '../fields/slug'
import type { CollectionConfig } from 'payload/types'
import IndexHero, { Type as IndexHeroTypes } from '../blocks/IndexHero'
import TabsBlock from '../blocks/Tabs'

export type Layout = IndexHeroTypes
export type Type = {
  layout: Layout[]
  blockType: any
}
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
      blocks: [IndexHero, TabsBlock],
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
