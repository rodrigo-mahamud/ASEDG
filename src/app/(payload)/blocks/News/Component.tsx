import React from 'react'
import NewsCard from './NewsCard'
import { Type } from '.'
import Container from '@/components/Container'

const NewsList: React.FC<Type> = ({ newsRelationship }) => {
  return (
    <Container>
      <div className="grid grid-cols-4 gap-8">
        {newsRelationship.reverse().map((item, index) => (
          <NewsCard className="btnShadow h-fit" key={index} data={item} />
        ))}
      </div>
    </Container>
  )
}

export default NewsList
