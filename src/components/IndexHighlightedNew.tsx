'use client'
import { useCallback, useState, useEffect } from 'react'
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

const TRANSITION_DURATION = 300 // ms

export function IndexHighlightedNew() {
  const [api, setApi] = useState<CarouselApi>()
  const [scrollSnap, setScrollSnap] = useState(0)

  useEffect(() => {
    if (!api) return

    const onSelect = () => {
      setScrollSnap(api.selectedScrollSnap())
    }

    api.on('select', onSelect)
    api.scrollTo(2) // Move to third element at start to center the carousel

    return () => {
      api.off('select', onSelect)
    }
  }, [api])

  const getItemStyle = useCallback(
    (index: number) => {
      const itemCount = reviews.length
      const centerIndex = 2 // The index of the center item
      const distance = Math.abs(((index - scrollSnap + itemCount) % itemCount) - centerIndex)

      let scale
      if (distance === 0) {
        scale = 1 // Center item at full scale
      } else if (distance === 1) {
        scale = 0.9 // Adjacent items slightly smaller
      } else {
        scale = 0.8 // Outer items smallest
      }

      return {
        transform: `scaleY(${scale})`,
        transition: `transform ${TRANSITION_DURATION}ms ease-in-out`,
      }
    },
    [scrollSnap],
  )

  return (
    <Carousel
      setApi={setApi}
      className="w-full maskNewsIndex"
      opts={{
        align: 'start',
        skipSnaps: false,
        loop: true,
        startIndex: 2,
      }}
    >
      <CarouselPrevious />
      <CarouselNext />
      <CarouselContent>
        {reviews.map((newsItem, index) => (
          <CarouselItem key={index} className="pl-3">
            <div
              style={getItemStyle(index)}
              className="aspect-[9/16] h-[38.5rem] transition-transform duration-300 ease-in-out"
            >
              <NRCard
                className="w-full h-full rounded-3xl hover:rounded-[2rem]"
                newsItem={newsItem}
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}
