import { GlobalConfig } from 'payload'
export type GlobalConfigTypes = {
  homePage: string
}
const Settings: GlobalConfig = {
  slug: 'settings',
  label: 'Settings',
  fields: [
    {
      name: 'defaultTitle',
      type: 'text',
      label: 'Titulo pot defecto',
      required: true,
    },
    {
      name: 'defaultDescription',
      type: 'textarea',
      label: 'Descripción pot defecto',
      required: true,
    },
    {
      name: 'favicon',
      type: 'upload',
      relationTo: 'media',
      label: 'Icono del sitio.',
      required: true,
    },
    {
      name: 'defaultOgImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Imagen por defecto del sitio.',
      required: true,
    },
  ],
}

export default Settings
