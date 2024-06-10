'use client'
import React, { useState, useEffect } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { Button } from '@/components/lib/button'

const categories = [
  'Archivos',
  'Algoritmos',
  'Hardware informático',
  'Motores de videojuegos',
  'Aterrizajes',
  'PC de juegos',
  'Call of Duty: Black Ops',
  'Aviones de ala fija',
  'Seguridad',
  'En directo',
]

const PrevButton = ({ enabled, onClick }) => (
  <Button
    variant="arrow"
    iconClass="w-4 h-4 stroke-1"
    className={`embla__button shadow-[0px_0px_20px_20px_#fff]  disabled:pointer-events-none disabled:opacity-0 ${
      enabled ? 'text-text-body' : 'text-detail-high-contrast'
    } shadow-inner-custom bg-white rounded-none flex items-center justify-center  rotate-180`}
    onClick={onClick}
    disabled={!enabled}
  ></Button>
)

const NextButton = ({ enabled, onClick }) => (
  <Button
    variant="arrow"
    iconClass="w-4 h-4 stroke-1"
    className={`embla__button shadow-[0px_0px_20px_20px_#fff] disabled:pointer-events-none disabled:opacity-0 ${
      enabled ? 'text-text-body' : 'text-detail-high-contrast'
    } shadow-inner-custom bg-white rounded-none flex items-center justify-center w-12 h-12`}
    onClick={onClick}
    disabled={!enabled}
  ></Button>
)

const Filter = () => {
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
      <div className="relative w-5/6 flex">
        <div className="embla__viewport overflow-hidden" ref={emblaRef}>
          <div className="embla__container flex backface-hidden touch-pan-y gap-2">
            {categories.map((category, index) => (
              <div
                key={index}
                className="embla__slide flex-shrink-0 w-slide-size min-w-0 pl-slide-spacing"
              >
                <div className="py-2 px-4 bg-secondary text-foreground rounded-md text-center">
                  {category}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute w-full h-full z-10 flex justify-between items-center overflow-hidden">
          <PrevButton onClick={() => emblaApi.scrollPrev()} enabled={prevBtnEnabled} />
          <NextButton onClick={() => emblaApi.scrollNext()} enabled={nextBtnEnabled} />
        </div>
      </div>
    </div>
  )
}

export default Filter
