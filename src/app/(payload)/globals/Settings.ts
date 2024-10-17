import { GlobalConfig } from 'payload'
import { validateImage } from '@/utils/validateImage'

const Settings: GlobalConfig = {
  slug: 'settings',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'defaultTitle',
      type: 'text',
      label: 'Titulo por defecto',
      required: true,
    },
    {
      name: 'defaultDescription',
      type: 'textarea',
      label: 'Descripción por defecto',
      required: true,
    },
    {
      name: 'faviconLight',
      type: 'upload',
      relationTo: 'media',
      label: 'Icono del sitio - modo claro',
      validate: validateImage(195, 195, 'png'),
      required: false,
      admin: {
        description:
          'Para dispositivos con el navegador en modo claro. Debe ser una imagen PNG de 195x195 píxeles.',
      },
    },
    {
      name: 'faviconDark',
      type: 'upload',
      relationTo: 'media',
      label: 'Icono del sitio - modo oscuro',
      validate: validateImage(195, 195, 'png'),
      required: false,
      admin: {
        description:
          'Para dispositivos con el navegador en modo oscuro. Debe ser una imagen PNG de 195x195 píxeles.',
      },
    },
    {
      name: 'defaultOgImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Imagen por defecto del sitio.',
      required: false,
    },
  ],
}

export default Settings
