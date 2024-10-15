import * as React from 'react'

import { Card, CardContent } from '@/components/lib/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/lib/carousel'
import FRCard from './FRCard'

export function FacilitiesRelated({ data }) {
  return (
    <Carousel
      opts={{
        align: 'start',
      }}
      className="w-full"
    >
      <div className="w-full flex items-center justify-between mb-4 mt-2">
        <h2 className="text-2xl font-medium line-clamp-1">Te puede interesar</h2>

        <div className="flex gap-2">
          <CarouselPrevious className="bg-transparent border border-border shadow disabled:shadow-none h-8 w-8" />
          <CarouselNext className="bg-transparent border border-border shadow disabled:shadow-none h-8 w-8" />
        </div>
      </div>
      <CarouselContent className="w-full ">
        {data.map((item, index) => (
          <CarouselItem key={index} className="md:basis-[49%] first:ml-4">
            <FRCard data={item}></FRCard>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}
