import React from 'react'
import NewsCard from './NewsCard'
import { Type } from '.'

const NewsList: React.FC<Type> = ({ news }) => {
  return (
    <div className="grid grid-cols-4 gap-8">
      {news.map((item, index) => (
        <NewsCard className="btnShadow h-fit" buttonVariant="secondary" key={index} data={item} />
      ))}
    </div>
  )
}

export default NewsList
