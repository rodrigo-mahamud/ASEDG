import { Block } from 'payload'

import link from '@/app/(payload)/fields/link'
import { Page } from '@/payload-types'
import { ButtonData } from '@/types/types'

export type LinkButtonType = {
  link: ButtonData[]
}

export type Type = {
  block: LinkButtonType
}

const LinkButton: Block = {
  slug: 'linkbutton',

  labels: {
    singular: 'Boton de enlace',
    plural: 'Botones de enlace',
  },
  fields: [link],
}

export default LinkButton
