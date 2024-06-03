import { Block } from 'payload/types'
import CalendarBlock from '../Calendar'
import BusList from '../BusList'
import IndexHero from '../IndexHero'

// import NewsGridBlock from '../NewsGridBlock';

const TabsBlock: Block = {
  slug: 'tabsblock',
  labels: {
    singular: 'Pestaña',
    plural: 'Pestañas',
  },
  fields: [
    {
      name: 'tabs',
      type: 'array',
      label: ' ',
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
          required: true,
          admin: {
            initCollapsed: true,
          },
          blocks: [BusList, CalendarBlock],
        },
      ],
    },
  ],
}

export default TabsBlock
