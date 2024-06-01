import { Block } from 'payload/types'
// import CalendarBlock from '../CalendarBlock';
import BusList from '../../blocks/BusList'
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
          blocks: [BusList],
        },
      ],
    },
  ],
}

export default TabsBlock
