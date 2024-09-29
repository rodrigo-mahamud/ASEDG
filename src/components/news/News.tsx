import React from 'react'
import Container from '@/components/Container'
import Title from '@/components/lib/title'
import NewsFilter from './NewsFilter'
import NewsGrid from './NewsGrid'
import { NewsTypes } from '@/app/(payload)/blocks/News'

export default function News({ allNews, subtitle, title }: NewsTypes) {
  // Extraer categorías únicas por ID
  const uniqueCategoriesMap = new Map(
    allNews.flatMap((item) => item.categories.map((category) => [category.id, category])),
  )
  const uniqueCategories = Array.from(uniqueCategoriesMap.values())

  // Extraer años únicos
  const years = [...new Set(allNews.map((item) => new Date(item.publishedDate).getFullYear()))]

  return (
    <Container>
      <Title title={title} subtitle={subtitle} />
      <NewsFilter categories={uniqueCategories} years={years} className="mb-8" />
      <NewsGrid allNews={allNews} />
    </Container>
  )
}
