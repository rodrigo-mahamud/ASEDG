import React from 'react'
import NewsCard from './NewsCard'
import { Type } from '.'
import Container from '@/components/Container'
import Title from '@/components/lib/title'

const NewsList: React.FC<Type> = ({ newsRelationship, title, subtitle }) => {
  return (
    <Container>
      <Title title={title} subtitle={subtitle}></Title>
      <div className="grid grid-cols-4 gap-8">
        {newsRelationship.reverse().map((item, index) => (
          <NewsCard className="btnShadow h-fit" key={index} data={item} />
        ))}
      </div>
    </Container>
  )
}

export default NewsList
