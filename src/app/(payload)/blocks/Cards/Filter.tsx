'use client'
import React, { useState, useEffect } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { Button } from '@/components/lib/button'

const PrevButton = ({ enabled, onClick }) => (
  <Button
    variant="arrow"
    iconClass="w-4 h-4 stroke-1"
    className={`embla__button shadow-[0px_0px_20px_20px_#fff] px-[2px] -mr-5 disabled:pointer-events-none disabled:opacity-0 ${
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
    className={`embla__button shadow-[0px_0px_20px_20px_#fff] px-[2px] -ml-5 disabled:pointer-events-none disabled:opacity-0 ${
      enabled ? 'text-text-body' : 'text-detail-high-contrast'
    } shadow-inner-custom bg-white rounded-none flex items-center justify-start z-10 `}
    onClick={onClick}
    disabled={!enabled}
  ></Button>
)

const Filter = ({ data }) => {
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

  return (
    <div className="embla max-w-carousel mx-auto mb-12">
      <div className="relative w-full flex">
        <PrevButton onClick={() => emblaApi.scrollPrev()} enabled={prevBtnEnabled} />
        <div className="embla__viewport overflow-hidden" ref={emblaRef}>
          <div className="embla__container flex backface-hidden touch-pan-y gap-2">
            {data.map((item) =>
              item.categories.map((category) => (
                <div
                  key={category.id}
                  className="embla__slide flex-shrink-0 w-slide-size min-w-0 pl-slide-spacing"
                >
                  <div className="py-2 px-4 bg-secondary text-foreground rounded-md text-center">
                    {category.title}
                  </div>
                </div>
              )),
            )}
          </div>
        </div>
        <NextButton onClick={() => emblaApi.scrollNext()} enabled={nextBtnEnabled} />
      </div>
    </div>
  )
}

export default Filter
