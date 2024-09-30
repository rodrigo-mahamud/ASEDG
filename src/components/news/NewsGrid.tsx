'use client'
import React, { useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import NewsCard from '@/components/news/NewsCard'
import { News } from '@/payload-types'

type FilteredNewsProps = {
  allNews: News[]
}

export default function NewsGrid({ allNews }: FilteredNewsProps) {
  const searchParams = useSearchParams()
  const category = searchParams.get('category')
  const year = searchParams.get('year')

  const filteredNews = useMemo(() => {
    return allNews.filter((news) => {
      const categoryMatch = !category || news.categories.some((cat: any) => cat.title === category)
      const yearMatch = !year || new Date(news.publishedDate).getFullYear().toString() === year
      return categoryMatch && yearMatch
    })
  }, [allNews, category, year])

  return (
    <div className="grid grid-cols-4 gap-8">
      {filteredNews.map((item) => (
        <NewsCard key={item.id} className="btnShadow" data={item} />
      ))}
    </div>
  )
}
