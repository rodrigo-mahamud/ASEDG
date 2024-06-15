'use client'
import Container from '@/components/Container'
import useEmblaCarousel from 'embla-carousel-react'
import React from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/lib/carousel'
const sliderData = [
  {
    id: 1,
    title: 'Serene Nature Scene with Sunlight Streaming Through Trees',
    url: 'https://cdn.pixabay.com/photo/2013/10/02/23/03/mountains-190055_1280.jpg',
  },
  {
    id: 2,
    title: 'Tranquil Beach with Gentle Waves and Clear Blue Sky',
    url: 'https://cdn.pixabay.com/photo/2013/07/18/20/26/sea-164989_1280.jpg',
  },
  {
    id: 3,
    title: 'Lush Forest Scene with Rays of Sunlight Peeking Through',
    url: 'https://cdn.pixabay.com/photo/2013/10/02/23/03/mountains-190055_1280.jpg',
  },
  {
    id: 4,
    title: 'Elegant Woman in City Setting with a Chic Attitude',
    url: 'https://cdn.pixabay.com/photo/2014/12/16/22/25/woman-570883_1280.jpg',
  },
  {
    id: 5,
    title: 'Majestic Tree in Vibrant Autumn Colors',
    url: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg',
  },
  {
    id: 6,
    title: 'Majestic Tree in Vibrant Autumn Colors',
    url: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg',
  },
  {
    id: 7,
    title: 'Majestic Tree in Vibrant Autumn Colors',
    url: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg',
  },
  {
    id: 8,
    title: 'Majestic Tree in Vibrant Autumn Colors',
    url: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg',
  },
]

export default function NewsPinged() {
  const [emblaRef] = useEmblaCarousel({ loop: false })

  return (
    <Carousel
      opts={{
        align: 'center',
      }}
      className="w-full flex justify-center"
    >
      <CarouselPrevious />
      <CarouselContent className="w-[inherit] bg-secondary">
        {sliderData.map((item, index) => (
          <CarouselItem key={index} className="md:basis-1/3 relative">
            <div className="embla__slide flex relative w-full " key={item.id}>
              <div className="absolute w-full h-full blurMask"></div>
              {/* the image */}
              <img className="w-full h-full" src={item.url} alt="" />

              {/* title/subtitle */}
              <h1 className="absolute ">{item.title}</h1>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselNext />
    </Carousel>
  )
}
