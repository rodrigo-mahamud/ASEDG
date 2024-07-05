import { Block } from 'payload'
import CalendarBlock from '../Calendar'
import BusList from '../BusList'
import NewsFeatured from '../NewsFeatured'

const TabsBlock: Block = {
  slug: 'tabsblock',
  labels: {
    singular: 'Sección de pestañas',
    plural: 'Sección de pestañas',
  },
  fields: [
    {
      name: 'tabs',
      type: 'array',
      label: ' ',
      labels: {
        singular: 'Pestaña',
        plural: 'Pestañas',
      },
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'tabTitle',
              type: 'text',
              label: 'Titulo de la pestaña',
              required: true,
            },

            {
              name: 'label',
              type: 'text',
              label: 'Etiqueta de la pestaña',
              required: true,
            },
          ],
        },
        {
          name: 'tabSubtitle',
          type: 'text',
          label: 'Descripción de la pestaña',
          required: true,
        },
        {
          name: 'content',
          type: 'blocks',
          label: 'Contenido de la pestaña',
          maxRows: 1,
          required: true,
          admin: {
            initCollapsed: true,
          },
          blocks: [BusList, CalendarBlock, NewsFeatured],
        },
      ],
    },
  ],
}

export default TabsBlock
