import type { GlobalConfig } from 'payload/types'
import link from '@/app/(payload)/fields/link'

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
      fields: [
        link({
          appearances: false,
        }),
      ],
      maxRows: 6,
      type: 'array',
    },
  ],
  slug: 'header',
}
