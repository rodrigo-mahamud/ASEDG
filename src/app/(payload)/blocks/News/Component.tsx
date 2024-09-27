import React from 'react'
import NewsCard from '@/components/NewsCard'
import { Type } from '.'
import Container from '@/components/Container'
import Title from '@/components/lib/title'
import FilteredCards from '@/components/FilteredCards'
import Pinged from './Pinged'
import News from './News'

export default function NewsBlock({ allNews, subtitle, title, filter, pingedNews }: Type) {
  return (
    <>
      <section className="w-full overflow-hidden">
        {pingedNews && <Pinged title="{title}" subtitle="{subtitle}"></Pinged>}
      </section>
      <section>
        <News allNews={allNews} subtitle={subtitle} title={title} filter={filter}></News>
      </section>
    </>
  )
}
