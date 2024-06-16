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
import Image from 'next/image'
import Link from 'next/link'

export default function NewsPinged({ newspinged, title, subtitle }) {
  console.log(newspinged)

  return (
    <>
      <section className="">
        <Container className="py-32">
          <Carousel
            opts={{
              align: 'center',
              startIndex: 2,
            }}
            className="w-full"
          >
            <div className="flex justify-between w-full">
              <Title title={title} subtitle={subtitle} />
              <div className="w-fit flex gap-4 items-center">
                <CarouselPrevious className="w-10 h-10 hover:text-secondaryAlt hover:border-secondaryAlt ease-in-out duration-300 border border-secondaryAlt/35 text-secondaryAlt/45" />
                <CarouselNext className="w-10 h-10 hover:text-secondaryAlt hover:border-secondaryAlt ease-in-out duration-300 border border-secondaryAlt/35 text-secondaryAlt/45" />
              </div>
            </div>
            <CarouselContent className="-ml-6 overflow-visible">
              {newspinged.map((newsItem) => (
                <CarouselItem
                  key={newsItem.id}
                  className="basis-[40%] relative ml-6 mainShadow transitionAlt hover:-translate-y-2 group rounded-lg"
                >
                  <Link href={`/news/${newsItem.slug}`}>
                    <div className="embla__slide flex relative w-full h-full items-end">
                      <div className="absolute w-full h-full blurMask rounded-lg"></div>
                      <div className="absolute z-10 pl-8 pb-8 flex items-center w-full">
                        <div className="w-4/5 pr-10">
                          <h2 className="text-white line-clamp-1 font-bold mb-1 text-lg">
                            {newsItem.title}
                          </h2>
                          <h2 className="text-white line-clamp-2">{newsItem.summary}</h2>
                        </div>
                        <div className="w-1/5 flex justify-center">
                          <Button
                            variant="arrow"
                            className="text-white bg-white/20 w-10 h-10 backdrop-blur-md"
                          ></Button>
                        </div>
                      </div>
                      <Image
                        src={newsItem.image.url}
                        quality={5}
                        sizes="(max-width: 1200px) 20vw, 35vw"
                        alt={newsItem.title}
                        width={500}
                        height={500}
                        className="w-full h-full rounded-lg"
                      ></Image>
                    </div>
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </Container>
      </section>
    </>
  )
}
