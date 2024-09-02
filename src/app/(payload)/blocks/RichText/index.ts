import { Block } from 'payload'

export interface LinkItem {
  linkText: string
  linkType: 'internal' | 'external' | 'location' | 'tel'
  description?: string
  internal?: string
  external?: string
  location?: string
  tel?: string
  linkIcon?: string
}

interface CategoriesTypes {
  title: string
  id: string
}

interface CardAttributes {
  categories: CategoriesTypes[]
  filter: boolean
  title: string
  description: string
  links: {
    link: LinkItem[]
  }
  cardImage: {
    url: string
    alt: string
  }
}

export type Type = {
  title: string
  description: string
  filter: boolean
  cards: CardAttributes[]
  data: CardAttributes[]
}

const RichText: Block = {
  slug: 'richtext',
  fields: [
    {
      type: 'richText',
      name: 'richtxtcontent',
    },
  ],
}
export default RichText
