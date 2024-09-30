import React from 'react'
import Container from '@/components/Container'
import Title from '@/components/lib/title'
import NewsFilter from './NewsFilter'
import NewsGrid from './NewsGrid'
import { News as NewsType, Cat } from '@/payload-types'

interface NewsProps {
  allNews: NewsType[]
  subtitle: string
  title: string
  filter: boolean
}

export default function News({ allNews, subtitle, title, filter }: NewsProps) {
  // Extraer categorías únicas
  const uniqueCategoriesMap = new Map<string, Cat>()
  allNews.forEach((item) => {
    item.categories.forEach((category) => {
      if (typeof category !== 'string') {
        uniqueCategoriesMap.set(category.id, category)
      }
    })
  })
  const uniqueCategories = Array.from(uniqueCategoriesMap.values())

  // Extraer años únicos
  const years = [...new Set(allNews.map((item) => new Date(item.publishedDate).getFullYear()))]

  return (
    <Container>
      <Title title={title} subtitle={subtitle} />
      {filter && <NewsFilter categories={uniqueCategories} years={years} className="mb-8" />}
      <NewsGrid allNews={allNews} />
    </Container>
  )
}
