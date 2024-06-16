import React from 'react'
import NewsCard from '@/components/NewsCard'
import { Type } from '.'
import Container from '@/components/Container'
import Title from '@/components/lib/title'

const NewsBlock: React.FC<Type> = ({ allNews, subtitle, title }) => {
  return (
    <Container>
      <Title title={title} subtitle={subtitle} />
      <div className="grid grid-cols-4 gap-8">
        {allNews.map((item, index) => (
          <NewsCard className="btnShadow h-fit" key={index} data={item} />
        ))}
      </div>
    </Container>
  )
}

export default NewsBlock
