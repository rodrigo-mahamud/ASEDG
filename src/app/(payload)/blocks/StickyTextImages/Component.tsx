'use client'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import { Type } from '.'

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
    <div className="w-full max-w-6xl h-[200vh] mx-auto px-4 md:px-6 py-24">
      <div className="max-w-md mx-auto lg:max-w-none">
        <div className="lg:sticky lg:top-0 h-fit space-y-16 lg:space-y-0">
          {sections.map((section, index) => (
            <div key={index} className={`lg:sticky top-12 bg-red-600 h-fit z-${index * 10}`}>
              <div className="flex flex-col lg:h-full lg:flex-row space-y-4 space-y-reverse lg:space-y-0 lg:space-x-20">
                <div className="flex-1 flex items-center">
                  <div className="space-y-3">
                    <div className="relative inline-flex ">{section.pretitle}</div>
                    <h2 className="text-4xl font-extrabold">{section.title}</h2>
                    <p>{section.text}</p>
                  </div>
                </div>
                <div
                  className={`flex-1 flex items-center transition duration-300 transform ${
                    index === activeIndex ? 'scale-100' : 'scale-80'
                  }`}
                >
                  <div className="relative w-full aspect-square">
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
          ))}
        </div>
      </div>
    </div>
  )
}
