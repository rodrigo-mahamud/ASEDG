'use client'
import { useCallback, useState, useEffect, useRef } from 'react'
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/lib/carousel'
import NRCard from './NewsPage/NRCard'
import { reviews } from './reviews'
import BlurFade from './lib/blurFade'

const TRANSITION_DURATION = 300 // ms

export function IndexHighlightedNew() {
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

  const getItemStyle = useCallback(
    (index: number) => {
      const itemCount = reviews.length

      // Calculate the distance considering the circular nature of the carousel
      let distance = Math.abs(index - scrollSnapRef.current)
      if (distance > itemCount / 2) {
        distance = itemCount - distance
      }

      // Interpolate the height based on the scroll progress
      let height
      if (distance < 1) {
        height = 100 - distance * 10 // Linear interpolation between 100% and 90%
      } else {
        height = 90 - (distance - 1) * 10 // Linear interpolation between 90% and 80%
      }

      height = Math.max(80, Math.min(100, height)) // Clamp between 80% and 100%

      return {
        height: `${height}%`,
        transition: `height ${TRANSITION_DURATION}ms ease-in-out`,
      }
    },
    [scrollProgress],
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
      <CarouselContent className="z-0 maskNewsIndex">
        {reviews.map((newsItem, index) => (
          <CarouselItem key={index} className="w-1/5 p-3">
            <BlurFade delay={0.25} inView>
              <div className="aspect-[9/16] flex justify-center items-center">
                <div
                  style={getItemStyle(index)}
                  className="transition-all duration-300 ease-in-out flex items-center"
                >
                  <NRCard
                    className="w-full h-full rounded-3xl hover:rounded-[2rem]"
                    newsItem={newsItem}
                  />
                </div>
              </div>
            </BlurFade>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}
