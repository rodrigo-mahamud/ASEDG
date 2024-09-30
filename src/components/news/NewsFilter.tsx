'use client'
import React, { ReactNode, useCallback, useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/lib/button'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/lib/select'
import useEmblaCarousel from 'embla-carousel-react'
import { Cat } from '@/payload-types'

type FilteredCardsProps = {
  categories: Cat[]
  years: number[]
  className: string
}

const PrevButton: React.FC<{ enabled: boolean; onClick: () => void }> = ({ enabled, onClick }) => (
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

const NextButton: React.FC<{ enabled: boolean; onClick: () => void }> = ({ enabled, onClick }) => (
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

export default function NewsFilter({ categories, years, className }: FilteredCardsProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    slidesToScroll: 3,
  })
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false)
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false)

  const selectedCategory = searchParams.get('category')
  const selectedYear = searchParams.get('year')

  const handleCategoryClick = useCallback(
    (category: string, event: React.MouseEvent) => {
      event.preventDefault()
      const params = new URLSearchParams(searchParams.toString())
      if (selectedCategory === category) {
        params.delete('category')
      } else {
        params.set('category', category)
      }
      router.replace(`?${params.toString()}`, { scroll: false })
    },
    [router, searchParams, selectedCategory],
  )

  const handleYearChange = useCallback(
    (year: string | undefined) => {
      const params = new URLSearchParams(searchParams.toString())
      if (year && year !== 'Ver todas') {
        params.set('year', year)
      } else {
        params.delete('year')
      }
      router.replace(`?${params.toString()}`, { scroll: false })
    },
    [router, searchParams],
  )

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setPrevBtnEnabled(emblaApi.canScrollPrev())
    setNextBtnEnabled(emblaApi.canScrollNext())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    emblaApi.on('select', onSelect)
    onSelect()
  }, [emblaApi, onSelect])

  return (
    <div className={className}>
      <div className="flex mb-8">
        <div className="embla w-9/12 mx-auto mb-4">
          <div className="relative w-full flex">
            <PrevButton
              onClick={() => emblaApi && emblaApi.scrollPrev()}
              enabled={prevBtnEnabled}
            />
            <div className="embla__viewport overflow-hidden py-3 -my-3" ref={emblaRef}>
              <div className="embla__container flex backface-hidden touch-pan-y gap-2 px-1">
                {categories.map((category: Cat) => (
                  <Button
                    key={category.id}
                    variant="ringHover"
                    className={`embla__slide flex-shrink-0 hover:ring-secondaryAlt w-slide-size min-w-0 pl-slide-spacing cursor-pointer rounded-md ${
                      selectedCategory === category.title
                        ? 'bg-secondaryAlt text-white'
                        : 'bg-secondary text-foreground'
                    }`}
                    onClick={(e) => handleCategoryClick(category.title, e)}
                  >
                    {category.title}
                  </Button>
                ))}
              </div>
            </div>
            <NextButton
              onClick={() => emblaApi && emblaApi.scrollNext()}
              enabled={nextBtnEnabled}
            />
          </div>
        </div>
        <div className="flex w-3/12 justify-end">
          <Select value={selectedYear ?? undefined} onValueChange={handleYearChange}>
            <SelectTrigger className="w-[180px] bg-secondary border-0 outline-0">
              <SelectValue placeholder="Filtrar por años" />
            </SelectTrigger>
            <SelectContent className="text-foreground">
              <SelectGroup>
                <SelectItem value="Ver todas">Ver todas</SelectItem>
                {years.map((year) => (
                  <SelectItem key={year} value={year.toString()}>
                    Año {year}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}
