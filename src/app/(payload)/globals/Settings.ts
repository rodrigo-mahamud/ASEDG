import { GlobalConfig } from 'payload'
export type GlobalConfigTypes = {
  homePage: string
}
const Settings: GlobalConfig = {
  slug: 'settings',
  label: 'Settings',
  fields: [
    {
      name: 'homePage',
      type: 'relationship',
      relationTo: 'pages',
      label: 'Pagina de inicio',
      required: true,
    },
    {
      name: 'newsPage',
      type: 'relationship',
      relationTo: 'pages',
      label: 'Pagina de noticias',
      required: true,
    },
  ],
}

export default Settings
