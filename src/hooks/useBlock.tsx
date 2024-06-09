// hooks/useBlock.tsx
import React from 'react'
import dynamic from 'next/dynamic'

// const CalendarComponent = dynamic(() => import('@/components/ui/CalendarComponent'))
const BusList = dynamic(() => import('@/app/(payload)/blocks/BusList/Component'))
// const NewsGrid = dynamic(() => import('@/components/ui/NewsGrid'))

export const useBlock = (block: any) => {
  switch (block.blockType) {
    // case 'calendar-block':
    //   return <CalendarComponent {...block} />
    case 'bus-list-block':
      return <BusList {...block} />
    // case 'news-grid-block':
    //   return <NewsGrid {...block} />
    default:
      return null
  }
}
