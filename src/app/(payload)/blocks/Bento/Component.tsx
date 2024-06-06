import React from 'react'
import BentoGridItem from './BentoItem'
import Title from '@/components/lib/title'
import { Type } from '.'

export default function BentoBlock({ tarjeta }: Type) {
  return (
    <section className="container py-32">
      <Title
        title="Bento Grid"
        subtitle="Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores suscipit facilis in nobis ut nesciunt doloremque dolor quae rem est, ducimus ratione nisi magnam aliquid esse quo accusamus nihil quidem!"
      ></Title>
      <div className="grid md:auto-rows-[24rem] grid-cols-1 md:grid-cols-3 gap-6 ">
        {tarjeta.map((item, i) => (
          <BentoGridItem
            key={i}
            data={item}
            className={i === 3 || i === 6 ? 'md:col-span-2' : ''}
          />
        ))}
      </div>
    </section>
  )
}
