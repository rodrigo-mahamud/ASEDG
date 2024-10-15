import * as React from 'react'

import { Card, CardContent } from '@/components/lib/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/lib/carousel'

export function FacilitiesRelated() {
  return (
    <Carousel
      opts={{
        align: 'start',
      }}
      className="w-full my-2"
    >
      <div className="w-full flex items-center justify-between mb-4 ">
        <h2 className="text-3xl font-semibold line-clamp-1">Te puede interesar</h2>
        <div className="flex gap-2">
          <CarouselPrevious className="bg-transparent border border-border shadow disabled:shadow-none" />
          <CarouselNext className="bg-transparent border border-border shadow disabled:shadow-none" />
        </div>
      </div>
      <CarouselContent className="w-full">
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index} className="md:basis-1/2">
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-video items-center justify-center p-6">
                  <span className="text-3xl font-semibold">{index + 1}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}
