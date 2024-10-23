'use client'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import { Type } from '.'
import Container from '@/components/Container'
import { Button } from '@/components/ui/button'
import { IconArrowRight } from '@tabler/icons-react'
import { Badge } from '@/components/ui/badge'

export default function StickyTextImages({ sections }: Type) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleScroll = () => {
      const { top, bottom, height } = container.getBoundingClientRect()
      const viewportHeight = window.innerHeight
      const scrollPosition = window.scrollY

      if (bottom <= 0) {
        setActiveIndex(sections.length - 1)
      } else if (top >= viewportHeight) {
        setActiveIndex(0)
      } else {
        const progress =
          (scrollPosition - (top + scrollPosition - viewportHeight)) / (height - viewportHeight)
        const index = Math.floor(progress * sections.length)
        setActiveIndex(Math.min(Math.max(index, 0), sections.length - 1))
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [sections.length])

  return (
    <Container className=" px-4 md:px-6 ">
      <div className="lg:sticky flex flex-col lg:top-0 h-fit  lg:space-y-0">
        {sections.map((section, index) => (
          <div key={index}>
            <div
              className={`lg:sticky top-36 rounded-xl overflow-hidden h-fit cardShadow z-${index * 10}`}
            >
              <div className="flex flex-col lg:h-full lg:flex-row ">
                <div className="w-2/5 flex items-stretch p-8 border border-border bg-white rounded-l-xl">
                  <div className=" flex flex-col justify-between">
                    <div className="flex flex-col space-y-4">
                      <Badge variant={'outline'} className="bg-secondary px-3 py-1 w-fit">
                        {section.pretitle}
                      </Badge>

                      <h2 className="text-3xl font-semibold">{section.title}</h2>
                      <p className="text-base text-pretty line-clamp-6">{section.text}</p>
                    </div>
                    <div className="flex items-center gap-3 mt-5 h-10">
                      <Button
                        variant="expandIcon"
                        iconClass="w-4 h-4"
                        Icon={IconArrowRight}
                        iconPlacement="right"
                        className="w-full flex gap-1 py-1 bg-secondaryAlt hover:bg-secondaryAlt/90 rounded-md h-full"
                      >
                        Ver Más
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="w-3/5 flex items-center">
                  <div className="relative w-full aspect-[15/9]">
                    <Image
                      src={section.image.url}
                      alt={section.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      priority={index === 0}
                      loading={index === 0 ? 'eager' : 'lazy'}
                      quality={35}
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="h-20"></div>
          </div>
        ))}
      </div>
    </Container>
  )
}
