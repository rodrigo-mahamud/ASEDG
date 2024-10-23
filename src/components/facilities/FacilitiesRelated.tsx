import * as React from 'react'

import { Card, CardContent } from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import FRCard from './FRCard'

export function FacilitiesRelated({ data }: any) {
  return (
    <Carousel
      opts={{
        align: 'start',
      }}
      className="w-full"
    >
      <div className="w-full flex items-center justify-between mb-4 ">
        <h2 className="text-2xl font-semibold line-clamp-1">Te puede interesar</h2>

        <div className="flex gap-2">
          <CarouselPrevious className="bg-transparent border border-border shadow disabled:shadow-none h-8 w-8" />
          <CarouselNext className="bg-transparent border border-border shadow disabled:shadow-none h-8 w-8" />
        </div>
      </div>
      <CarouselContent className="w-full ">
        {data.map((item: any, index: any) => (
          <CarouselItem key={index} className="basis-[75%] md:basis-[49%] first:ml-4">
            <FRCard data={item}></FRCard>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}
