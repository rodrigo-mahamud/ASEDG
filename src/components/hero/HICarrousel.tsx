'use client'
import { useCallback, useState, useEffect, useRef } from 'react'
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import NRCard from '@/components/news/news-page/NRCard'
import BlurFade from '@/components/ui/blurFade'
import { IndexHighlightedNewProps } from '@/types/types'

export function HICarrousel({ data }: IndexHighlightedNewProps) {
  const [api, setApi] = useState<CarouselApi>()
  const [scrollProgress, setScrollProgress] = useState(0)
  const scrollSnapRef = useRef(0)

  useEffect(() => {
    if (!api) return

    const onScroll = () => {
      const progress = api.scrollProgress()
      setScrollProgress(progress)
      scrollSnapRef.current = api.selectedScrollSnap()
    }

    api.on('scroll', onScroll)
    api.scrollTo(2) // Move to third element at start to center the carousel

    return () => {
      api.off('scroll', onScroll)
    }
  }, [api])

  const getItemStyles = useCallback(
    (index: number) => {
      const itemCount = data.length

      // Calculate the distance considering the circular nature of the carousel
      let distance = index - scrollSnapRef.current
      if (distance > itemCount / 2) {
        distance -= itemCount
      } else if (distance < -itemCount / 2) {
        distance += itemCount
      }

      const isBefore = distance < 0

      let scale
      if (Math.abs(distance) < 1) {
        scale = 1 - Math.abs(distance) * 0.1
      } else {
        scale = 0.9 - (Math.abs(distance) - 1) * 0.1
      }

      scale = Math.max(0.8, Math.min(1, scale))

      const isMinScale = scale === 0.8

      return {
        outerStyle: {},
        innerStyle: {
          transformOrigin: isMinScale ? (isBefore ? 'right' : 'left') : ' ',
          transform: `scale(${scale})`,
          transition: `all 0.5s cubic-bezier(0.14, 1, 0.34, 1)`,
        },
      }
    },
    [data.length],
  )

  return (
    <Carousel
      setApi={setApi}
      className="relative w-screen"
      opts={{
        align: 'center',
        loop: true,
        startIndex: 3,
      }}
    >
      <CarouselPrevious className="absolute z-20 text-white size-12 top-1/2 left-1/3 bg-white/15 shadow-md backdrop-blur-lg" />
      <CarouselNext className="absolute z-20 text-white size-12 top-1/2 right-1/3 bg-white/15 shadow-md backdrop-blur-lg" />
      <CarouselContent className="z-0 h-full maskNewsIndex">
        {data.map((newsItem, index) => (
          <BlurFade key={index} delay={0.5} inView>
            <CarouselItem className="w-1/5 h-full">
              <div style={getItemStyles(index).outerStyle} className="flex ">
                <div
                  style={getItemStyles(index).innerStyle}
                  className=" md:h-80 lg:h-96 xl:h-[30rem] 2xl:h-[38.5rem] aspect-[9/16] transition-all duration-300 ease-in-out flex items-center"
                >
                  <NRCard className="w-full h-full rounded-2xl hover:rounded-3xl" data={newsItem} />
                </div>
              </div>
            </CarouselItem>
          </BlurFade>
        ))}
      </CarouselContent>
    </Carousel>
  )
}
