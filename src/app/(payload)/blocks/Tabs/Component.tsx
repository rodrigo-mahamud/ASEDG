import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/lib/tabs'
import { IconBus, IconCalendarEvent, IconNews } from '@tabler/icons-react'
import RenderBlocks from '@/components/RenderBlocks'
import { Layout } from '@/app/(payload)/collections/Pages'
import Title from '@/components/lib/title'
import Container from '@/components/Container'

type Props = {
  tabs: {
    label: string
    tabTitle: string
    tabSubtitle: string
    content: Layout[]
  }[]
}

const TabsBlock: React.FC<Props> = ({ tabs }) => {
  // console.log(tabs)

  return (
    <Container>
      <Tabs defaultValue={tabs[0]?.content[0]?.blockType || 'calendar-block'}>
        <div className="flex justify-end absolute right-0 px-[inherit] ">
          <TabsList className="flex space-x-4 ">
            {tabs.map((tab, i) => (
              <TabsTrigger key={i} value={tab.content[0]?.blockType}>
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        {tabs.map((tab, i) => (
          <TabsContent key={i} value={tab.content[0]?.blockType}>
            <Title title={tab.tabTitle} subtitle={tab.tabSubtitle}></Title>
            <RenderBlocks layout={tab.content} />
          </TabsContent>
        ))}
      </Tabs>
    </Container>
  )
}

export default TabsBlock
