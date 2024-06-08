import slug from '../fields/slug'
import type { CollectionConfig } from 'payload/types'
import IndexHero, { Type as IndexHeroTypes } from '../blocks/IndexHero'
import CallToAction from '../blocks/CallToAction'
import BentoBlock from '../blocks/Bento'
import TabsBlock from '../blocks/Tabs'
import TextImagesBlock from '../blocks/TextImages'
import CardsBlock from '../blocks/Cards'

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
      type: 'tabs',
      tabs: [
        {
          label: 'Cabecera',
          name: 'header',
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
          ],
        },
        {
          label: 'Cuerpo',
          name: 'body',
          fields: [
            {
              name: 'layout',
              label: ' ',
              labels: {
                singular: 'Seccion',
                plural: 'Secciones',
              },
              type: 'blocks',
              blocks: [IndexHero, TabsBlock, CallToAction, BentoBlock, TextImagesBlock, CardsBlock],
            },
          ],
        },
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
