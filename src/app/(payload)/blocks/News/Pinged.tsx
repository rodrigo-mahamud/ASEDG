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
import { Alert } from '@/components/lib/alert'
import { PingedProps, NewsItem } from '.'

interface ExtendedPingedProps extends PingedProps {
  allNews: NewsItem[]
}

export default function Pinged({ title, subtitle, allNews }: ExtendedPingedProps) {
  const fixedNews = allNews.filter((news) => news.fixed === true)

  return (
    <>
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
          {fixedNews.length > 0 ? (
            <CarouselContent className="-ml-6 overflow-visible">
              {fixedNews.map((newsItem) => (
                <CarouselItem
                  key={newsItem.id}
                  className="basis-[40%] relative ml-6 mainShadow group hover:rounded-2xl"
                >
                  <Link href={`/noticias-san-esteban-de-gormaz/${newsItem.slug}`}>
                    <div className="embla__slide flex relative w-full h-[22rem] transition-generic items-end rounded-lg group-hover:rounded-2xl overflow-hidden">
                      <div className="flex gap-2 m-8 z-20 absolute top-0 opacity-0 group-hover:opacity-100 transition-generic">
                        {newsItem.categories.map((cat, index) => (
                          <div key={index} className="bg-white/25 backdrop-blur-md rounded-full">
                            <p className="text-white px-4 my-1 text-sm leading-normal">
                              {cat.title}
                            </p>
                          </div>
                        ))}
                      </div>
                      <div className="absolute w-full h-full blurMaskAlt rounded-lg group-hover:rounded-2xl z-10"></div>
                      <div className="absolute z-10 pl-8 pb-8 flex items-center w-full">
                        <div className="w-4/5 pr-5 z-20">
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
                      <div className="overflow-hidden rounded-lg group-hover:rounded-2xl transition-generic h-[inherit] w-full">
                        <Image
                          src={
                            newsItem.image?.url || newsItem.masonryImages?.masonryImage1?.url || ''
                          }
                          quality={5}
                          sizes="(max-width: 1200px) 20vw, 35vw"
                          alt={
                            newsItem.image?.alt ||
                            newsItem.masonryImages?.masonryImage1?.alt ||
                            newsItem.title
                          }
                          width={500}
                          height={500}
                          className="w-full h-full object-cover group-hover:scale-105 group-hover:brightness-75 z-0 transition-generic"
                        />
                      </div>
                    </div>
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>
          ) : (
            <Alert className="text-red-950" variant={'destructive'}>
              No hay noticias fijadas para mostrar
            </Alert>
          )}
        </Carousel>
      </Container>
    </>
  )
}