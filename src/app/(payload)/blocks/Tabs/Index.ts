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
      type: 'row',
      fields: [
        {
          name: 'TabTitle',
          type: 'text',
          label: 'Titulo de la seccion',
          required: true,
        },
        {
          name: 'TabSubtitle',
          type: 'text',
          label: 'Subtitulo de la seccion',
          required: true,
        },
      ],
    },
    {
      name: 'tabs',
      type: 'array',
      label: ' ',
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'Nombre de la pestaña',
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
