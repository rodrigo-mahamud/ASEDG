import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/lib/tabs'
import { IconBus, IconCalendarEvent, IconNews } from '@tabler/icons-react'
import RenderBlocks from '@/components/RenderBlocks'
import { Layout } from '@/app/(payload)/collections/Pages'

type Props = {
  tabs: {
    label: string
    content: Layout[]
  }[]
}

const TabsBlock: React.FC<Props> = ({ tabs }) => {
  return (
    <Tabs
      defaultValue={tabs[0]?.content[0]?.blockType || 'calendar-block'}
      className="container mx-auto py-32 relative"
    >
      <div className="flex justify-end absolute right-0 px-[inherit]">
        <TabsList className="flex space-x-4">
          {tabs.map((tab, i) => (
            <TabsTrigger key={i} value={tab.content[0]?.blockType}></TabsTrigger>
          ))}
        </TabsList>
      </div>
      {tabs.map((tab, i) => (
        <TabsContent key={i} value={tab.content[0]?.blockType}>
          <RenderBlocks layout={tab.content} />
        </TabsContent>
      ))}
    </Tabs>
  )
}

export default TabsBlock
