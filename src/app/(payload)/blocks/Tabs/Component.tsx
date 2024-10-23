import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import RenderBlocks from '@/components/RenderBlocks'
import Title from '@/components/ui/title'
import Container from '@/components/Container'

type Props = {
  tabs: {
    label: string
    tabTitle: string
    tabSubtitle: string
    content: any
  }[]
}

const TabsBlock: React.FC<Props> = ({ tabs }) => {
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
