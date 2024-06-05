import type { GlobalConfig } from 'payload/types'
import headerLink from '../fields/headerLink'

export const Header: GlobalConfig = {
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'Nav Menu',
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
  slug: 'header',
}
