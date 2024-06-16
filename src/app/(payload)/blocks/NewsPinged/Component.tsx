'use client'
import Container from '@/components/Container'
import React from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/lib/carousel'
import { Button } from '@/components/lib/button'
import Title from '@/components/lib/title'
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
  return (
    <section className="py-32">
      <Container className="py-0">
        <Title title="hola" subtitle="ksd dsfa sfd asdf hsdfsdf sdfg gfdh arfs"></Title>
      </Container>
      <Carousel
        opts={{
          align: 'center',
          startIndex: 1,
          dragFree: true,
          skipSnaps: true,
        }}
        className="w-full flex justify-center "
      >
        <CarouselPrevious />
        <CarouselContent className="-ml-6">
          {sliderData.map((item, index) => (
            <CarouselItem key={index} className="md:basis-1/3 relative pl-6">
              <div className="embla__slide flex relative w-full h-full items-end " key={item.id}>
                <div className="absolute w-full h-full blurMask rounded-md"></div>
                <div className="absolute z-10 pl-8 pb-8 flex items-center w-full">
                  <div className="w-4/5 pr-10">
                    <h2 className="text-white line-clamp-1 font-bold mb-1 text-lg">{item.title}</h2>
                    <h2 className="text-white line-clamp-2">{item.title}</h2>
                  </div>
                  <div className="w-1/5 flex justify-center">
                    <Button variant="arrow" className="text-white"></Button>
                  </div>
                </div>

                <img className="w-full h-full rounded-md" src={item.url} alt="" />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselNext />
      </Carousel>
    </section>
  )
}
