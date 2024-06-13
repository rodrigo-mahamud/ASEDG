import React from 'react'
import NewsCard from '@/components/NewsCard'
import { Type } from '.'

const NewsFeatured: React.FC<Type> = ({ newsFour }) => {
  return (
    <div className="grid grid-cols-4 gap-8">
      {newsFour.reverse().map((item, index) => (
        <NewsCard className="btnShadow h-fit" key={index} data={item} />
      ))}
    </div>
  )
}

export default NewsFeatured
