import { Block } from 'payload/types'
// import CalendarBlock from '../CalendarBlock';
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
          maxRows: 4,
          blocks: [BusList],
        },
      ],
    },
  ],
}

export default TabsBlock
