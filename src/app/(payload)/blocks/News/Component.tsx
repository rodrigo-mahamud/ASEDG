import React from 'react'
import NewsCard from './NewsCard'
import { Type } from '.'

const NewsList: React.FC<Type> = ({ news }) => {
  return (
    <div>
      {news.map((item, index) => (
        <NewsCard key={index} data={item} />
      ))}
    </div>
  )
}

export default NewsList
