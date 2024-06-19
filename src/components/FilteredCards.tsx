'use client'
import React, { ReactNode, useState, useCallback, useEffect } from 'react'
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

type FilteredCardsProps = {
  data: any[]
  className: string
  filterEnabled: boolean
  children: (item: any) => ReactNode
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

export default function FilteredCards({
  data,
  children,
  className,
  filterEnabled,
}: FilteredCardsProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedYear, setSelectedYear] = useState<string | null>(null)
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    slidesToScroll: 3,
  })
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false)
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false)

  const uniqueCategories = new Set<string>()
  const categories = data.flatMap((item) =>
    item.categories.filter((category: any) => {
      if (uniqueCategories.has(category.id)) {
        return false
      } else {
        uniqueCategories.add(category.id)
        return true
      }
    }),
  )

  const uniqueYears = [...new Set(data.map((item) => new Date(item.publishedDate).getFullYear()))]

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(selectedCategory === category ? null : category)
  }

  const handleYearChange = (year: string | null) => {
    setSelectedYear(year)
  }

  const filteredData = data.filter((item) => {
    const categoryMatch =
      selectedCategory === null ||
      item.categories.some((cat: any) => cat.title === selectedCategory)
    const yearMatch =
      selectedYear === null ||
      new Date(item.publishedDate).getFullYear().toString() === selectedYear
    return categoryMatch && yearMatch
  })

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
    <>
      {filterEnabled && (
        <div className="flex mb-8">
          <div className="embla w-9/12 mx-auto mb-4">
            <div className="relative w-full flex">
              <PrevButton
                onClick={() => emblaApi && emblaApi.scrollPrev()}
                enabled={prevBtnEnabled}
              />
              <div className="embla__viewport overflow-hidden py-3 -my-3" ref={emblaRef}>
                <div className="embla__container flex backface-hidden touch-pan-y gap-2 px-1">
                  {categories.map((category) => (
                    <Button
                      key={category.id}
                      variant="ringHover"
                      className={`embla__slide flex-shrink-0 hover:ring-secondaryAlt w-slide-size min-w-0 pl-slide-spacing cursor-pointer rounded-md ${
                        selectedCategory === category.title
                          ? 'bg-secondaryAlt text-white'
                          : 'bg-secondary text-foreground'
                      }`}
                      onClick={() => handleCategoryClick(category.title)}
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
            <Select value={selectedYear} onValueChange={handleYearChange}>
              <SelectTrigger className="w-[180px] bg-secondary">
                <SelectValue placeholder="Select a year" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value={null}>Ver todas</SelectItem>
                  {uniqueYears.map((year) => (
                    <SelectItem key={year} value={year.toString()}>
                      Año {year}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}
      <div className={className}>
        {filteredData.map((item, index) => (
          <React.Fragment key={index}>{children(item)}</React.Fragment>
        ))}
      </div>
    </>
  )
}
