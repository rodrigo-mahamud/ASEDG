import React from 'react'
import { BentoGrid, BentoGridItem } from './bentoItem'

import Title from '@/components/lib/title'

export function BentoIndex() {
  return (
    <section className="container py-32">
      <Title
        title="Bento Grid"
        subtitle="Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores suscipit facilis in nobis ut nesciunt doloremque dolor quae rem est, ducimus ratione nisi magnam aliquid esse quo accusamus nihil quidem!"
      ></Title>
      <BentoGrid>
        {items.map((item, i) => (
          <BentoGridItem
            key={i}
            title={item.title}
            description={item.description}
            header={item.image}
            icon={item.icon}
            className={i === 3 || i === 6 ? 'md:col-span-2' : ''}
          />
        ))}
      </BentoGrid>
    </section>
  )
}
const Skeleton = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-md bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100"></div>
)
const items = [
  {
    title: 'The Dawn of Innovation',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores suscipit facilis in nobis ut nesciunt doloremque dolor quae rem est, ducimus ratione nisi magnam aliquid esse quo accusamus nihil quidem!',
    image: <Skeleton />,
    icon: '',
  },
]
