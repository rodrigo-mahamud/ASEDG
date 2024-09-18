'use client'
import React from 'react'
import NewsCard from '@/components/NewsCard'
import { Type } from '.'
import Container from '@/components/Container'
import Title from '@/components/lib/title'
import FilteredCards from '@/components/FilteredCards'

const NewsBlock: React.FC<Type> = ({ allNews, subtitle, title, filter }) => {
  return (
    <Container>
      <Title title={title} subtitle={subtitle} />
      <FilteredCards data={allNews} filterEnabled={filter} className="grid grid-cols-4 gap-8">
        {(item) => <NewsCard className="btnShadow" data={item} />}
      </FilteredCards>
    </Container>
  )
}

export default NewsBlock
