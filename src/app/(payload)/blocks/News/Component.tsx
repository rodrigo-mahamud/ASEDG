import React from 'react'
import { NewsBlockProps } from '.'
import Pinged from './Pinged'
import News from './News'

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
        {pingedNews && <Pinged title={pntitle} subtitle={pnsubtitle} allNews={allNews} />}
      </section>
      <section>
        <News allNews={allNews} subtitle={subtitle} title={title} filter={filter} />
      </section>
    </>
  )
}
