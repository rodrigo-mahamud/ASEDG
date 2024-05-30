import { GlobalConfig } from 'payload/types'
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
      label: 'Home Page',
      required: true,
    },
  ],
}

export default Settings
