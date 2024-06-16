import * as React from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/lib/carousel'

interface IndexHeroNewsProps {
  children: React.ReactNode
}

export function IndexHeroNews({ children }: IndexHeroNewsProps) {
  return (
    <Carousel
      opts={{
        align: 'center',
      }}
      className="w-10/12 flex justify-center"
    >
      <CarouselPrevious className="absolute h-8 w-8 -left-12 top-1/2 -translate-y-1/2" />
      <CarouselContent className="w-[inherit] shadow-[0_25px_70px_0px_rgba(50,50,93,0.25)] rounded-xl bg-secondary">
        {React.Children.map(children, (child, index) => (
          <CarouselItem key={index} className="md:basis-full ">
            {child}
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselNext className="absolute h-8 w-8 -right-12 top-1/2 -translate-y-1/2" />
    </Carousel>
  )
}
