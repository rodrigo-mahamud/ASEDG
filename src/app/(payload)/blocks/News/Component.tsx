import React from 'react'
import { NewsBlockProps } from '.'
import configPromise from '@payload-config'
import News from '@/components/news/News'
import NewsPinged from '@/components/news/NewsPinged'
import { getPayloadHMR } from '@payloadcms/next/utilities'

export default async function NewsBlock({
  subtitle,
  title,
  filter,
  pntitle,
  pnsubtitle,
  pingedNews,
}: NewsBlockProps) {
  const payload = await getPayloadHMR({ config: configPromise })
  const news = await payload.find({
    collection: 'news',
  })
  const allNews = news.docs

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
