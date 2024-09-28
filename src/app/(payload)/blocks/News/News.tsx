'use client'
import Container from '@/components/Container'
import FilteredCards from '@/components/FilteredCards'
import Title from '@/components/lib/title'
import NewsCard from '@/components/NewsCard'
import React from 'react'
import { NewsTypes } from '.'

export default function News({ allNews, subtitle, title, filter }: NewsTypes) {
  return (
    <Container>
      <Title title={title} subtitle={subtitle} />
      <FilteredCards data={allNews} filterEnabled={filter} className="grid grid-cols-4 gap-8">
        {(item) => <NewsCard className="btnShadow" data={item} />}
      </FilteredCards>
    </Container>
  )
}
