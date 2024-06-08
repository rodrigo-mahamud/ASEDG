import type { GlobalConfig } from 'payload/types'
import headerLink from '../fields/headerLink'

export const Header: GlobalConfig = {
  slug: 'header',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'navMenu',
      label: 'Navegación',
      labels: {
        plural: 'Grupo',
        singular: 'Grupos',
      },
      fields: [headerLink({})],
      maxRows: 6,
      type: 'array',
    },
  ],
}
