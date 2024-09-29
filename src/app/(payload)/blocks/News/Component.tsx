import React from 'react'
import { NewsBlockProps } from '.'

import News from '@/components/news/News'
import NewsPinged from '@/components/news/NewsPinged'

export default function NewsBlock({
  allNews,
  subtitle,
  title,
  filter,
  pntitle,
  pnsubtitle,
  pingedNews,
}: NewsBlockProps) {
  return (
    <>
      <section className="w-full overflow-hidden">
        {pingedNews && <NewsPinged title={pntitle} subtitle={pnsubtitle} allNews={allNews} />}
      </section>
      <section>
        <News allNews={allNews} subtitle={subtitle} title={title} filter={filter} />
      </section>
    </>
  )
}
