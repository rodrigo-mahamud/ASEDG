import { Block } from 'payload/types'
// import CalendarBlock from '../CalendarBlock';
import BusList from '../BusList'
import IndexHero from '../IndexHero'
// import NewsGridBlock from '../NewsGridBlock';

const TabsBlock: Block = {
  slug: 'tabsblock',
  fields: [
    {
      name: 'tabs',
      type: 'array',
      label: 'Tabs',
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'Tab Label',
          required: true,
        },
        {
          name: 'content',
          type: 'blocks',
          label: 'Tab Content',
          required: true,
          blocks: [BusList, IndexHero],
        },
      ],
    },
  ],
}

export default TabsBlock
