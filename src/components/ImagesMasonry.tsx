'use client'
import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import { Carousel, CarouselContent, CarouselItem } from '@/components/lib/carousel'
import { type CarouselApi } from '@/components/lib/carousel'

interface ImagesMasonryProps {
  imageSrcs: string[]
  imageAlts: string[]
  thumbnailSrcs: string[]
}

export default function ImagesMasonry({ imageSrcs, imageAlts, thumbnailSrcs }: ImagesMasonryProps) {
  const [isMobile, setIsMobile] = useState(false)
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)

  // Detectar si es dispositivo móvil
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkIfMobile()
    window.addEventListener('resize', checkIfMobile)

    return () => window.removeEventListener('resize', checkIfMobile)
  }, [])

  useEffect(() => {
    if (!api) {
      return
    }

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])

  // Versión móvil - Carrusel
  if (isMobile) {
    return (
      <div className="relative w-full">
        <Carousel
          setApi={setApi}
          className="w-full"
          opts={{
            align: 'start',
            loop: true,
          }}
        >
          <CarouselContent className="w-full">
            {imageSrcs.map((src, index) => (
              <CarouselItem key={index} className="relative h-[28rem] w-full">
                <Image
                  src={src}
                  fill
                  placeholder="blur"
                  blurDataURL={thumbnailSrcs[index]}
                  className="object-cover w-full"
                  quality={50}
                  sizes="100vw"
                  alt={imageAlts[index]}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* Indicador numérico */}
        <div className="absolute bottom-4 right-4 bg-black/25 backdrop-blur-md px-3 py-1 rounded-full text-white text-xs">
          {current + 1}/{imageSrcs.length}
        </div>
      </div>
    )
  }

  // Versión desktop - Masonry grid
  return (
    <div className="grid grid-cols-4 grid-rows-4 gap-2 h-[35rem]">
      <div className="col-span-2 row-span-4 relative overflow-hidden rounded-l-xl">
        <Image
          src={imageSrcs[0]}
          fill
          placeholder="blur"
          blurDataURL={thumbnailSrcs[0]}
          className="w-full object-cover"
          quality={50}
          sizes="(max-width: 1200px) 50vw, 35vw"
          alt={imageAlts[0]}
        />
      </div>
      <div className="row-span-2 col-start-3 relative h-full overflow-hidden">
        <Image
          src={imageSrcs[1]}
          fill
          placeholder="blur"
          blurDataURL={thumbnailSrcs[1]}
          className="w-full object-cover"
          quality={15}
          sizes="(max-width: 1200px) 50vw, 35vw"
          alt={imageAlts[1]}
        />
      </div>
      <div className="row-span-2 col-start-3 row-start-3 relative h-full overflow-hidden">
        <Image
          src={imageSrcs[2]}
          fill
          placeholder="blur"
          blurDataURL={thumbnailSrcs[2]}
          className="w-full object-cover"
          quality={15}
          sizes="(max-width: 1200px) 50vw, 35vw"
          alt={imageAlts[2]}
        />
      </div>
      <div className="row-span-2 col-start-4 row-start-1 relative h-full overflow-hidden rounded-tr-xl">
        <Image
          src={imageSrcs[3]}
          fill
          placeholder="blur"
          blurDataURL={thumbnailSrcs[3]}
          className="w-full object-cover"
          quality={15}
          sizes="(max-width: 1200px) 50vw, 35vw"
          alt={imageAlts[3]}
        />
      </div>
      <div className="row-span-2 col-start-4 row-start-3 relative h-full overflow-hidden rounded-br-xl">
        <Image
          src={imageSrcs[4]}
          fill
          placeholder="blur"
          blurDataURL={thumbnailSrcs[4]}
          className="w-full object-cover"
          quality={15}
          sizes="(max-width: 1200px) 50vw, 35vw"
          alt={imageAlts[4]}
        />
      </div>
    </div>
  )
}
