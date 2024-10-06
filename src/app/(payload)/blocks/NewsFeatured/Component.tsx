import React from 'react'
import NewsCard from '@/components/news/NewsCard'
import { Type } from '.'

export default function NewsFeatured({ newsFour }: Type) {
  return (
    <div className="grid grid-cols-4 gap-8">
      {newsFour.map((item, index) => (
        <NewsCard className="btnShadow h-fit" key={index} data={item} />
      ))}
    </div>
  )
}
