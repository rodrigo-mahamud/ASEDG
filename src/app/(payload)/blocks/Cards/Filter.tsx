'use client'
import React, { useState, useEffect } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { Button } from '@/components/lib/button'

const PrevButton = ({ enabled, onClick }) => (
  <Button
    variant="arrow"
    iconClass="w-4 h-4 stroke-1"
    className={`embla__button h-[inherit] shadow-[0px_0px_20px_20px_#fff] px-[2px] -mr-5 disabled:pointer-events-none disabled:opacity-0 ${
      enabled ? 'text-text-body' : 'text-detail-high-contrast'
    } shadow-inner-custom bg-white rounded-none flex items-center justify-start z-10 rotate-180`}
    onClick={onClick}
    disabled={!enabled}
  ></Button>
)

const NextButton = ({ enabled, onClick }) => (
  <Button
    variant="arrow"
    iconClass="w-4 h-4 stroke-1"
    className={`embla__button h-[inherit] shadow-[0px_0px_20px_20px_#fff] px-[2px] -ml-5 disabled:pointer-events-none disabled:opacity-0 ${
      enabled ? 'text-text-body' : 'text-detail-high-contrast'
    } shadow-inner-custom bg-white rounded-none flex items-center justify-start z-10 `}
    onClick={onClick}
    disabled={!enabled}
  ></Button>
)

const Filter = ({ data, onFilterChange, selectedCategory }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false })
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false)
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false)

  const onSelect = () => {
    if (!emblaApi) return
    setPrevBtnEnabled(emblaApi.canScrollPrev())
    setNextBtnEnabled(emblaApi.canScrollNext())
  }

  useEffect(() => {
    if (!emblaApi) return
    emblaApi.on('select', onSelect)
    onSelect()
  }, [emblaApi])

  // Create a set to track unique categories
  const uniqueCategories = new Set()
  const filteredData = data.flatMap((item) =>
    item.categories.filter((category) => {
      if (uniqueCategories.has(category.id)) {
        return false
      } else {
        uniqueCategories.add(category.id)
        return true
      }
    }),
  )

  return (
    <div className="embla max-w-carousel mx-auto mb-12">
      <div className="relative w-full flex">
        <PrevButton onClick={() => emblaApi.scrollPrev()} enabled={prevBtnEnabled} />
        <div className="embla__viewport overflow-hidden py-3 -my-3" ref={emblaRef}>
          <div className="embla__container flex backface-hidden touch-pan-y gap-2">
            {filteredData.map((category) => (
              <Button
                key={category.id}
                variant="ringHover"
                className={`embla__slide flex-shrink-0  hover:ring-secondaryAlt w-slide-size min-w-0 pl-slide-spacing cursor-pointer rounded-md ${
                  selectedCategory === category.title
                    ? 'bg-secondaryAlt text-white'
                    : 'bg-secondary text-foreground'
                }`}
                onClick={() => onFilterChange(category.title)}
              >
                {category.title}
              </Button>
            ))}
          </div>
        </div>
        <NextButton onClick={() => emblaApi.scrollNext()} enabled={nextBtnEnabled} />
      </div>
    </div>
  )
}

export default Filter
