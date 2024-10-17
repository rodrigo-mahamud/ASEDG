import type { GlobalConfig } from 'payload'
import headerLink from '../fields/headerLink'
import { validateImage } from '@/utils/validateImage'

const Header: GlobalConfig = {
  slug: 'header',
  label: 'Barra de Navegación',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'navMenuLogo',
      type: 'upload',
      relationTo: 'media',
      label: 'Logo barra de navegación',
      validate: validateImage(125, undefined, 'png'),
      required: false,
      admin: {
        description:
          'Logo que se muestra en la parte superior izquierda. Debe ser una imagen PNG con 125px de ancho.',
      },
    },
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
export default Header
