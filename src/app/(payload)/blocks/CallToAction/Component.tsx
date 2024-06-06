import React from 'react'
import { Type } from '.'
import { Meteors } from '@/components/lib/meteors'
import { Button } from '@/components/lib/button'
import { IconArrowRight } from '@tabler/icons-react'
import Link from 'next/link'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import ParallaxItem from '@/components/ParallaxItem'
// const ParallaxItem = dynamic(() => import('@/components/ParallaxItem'), { ssr: false })

export default function CallToAction({ title, text, image, link, speed, style, decoration }: Type) {
  return (
    <section className="w-full relative h-[45rem] clip-path-cta bg-[#030122] overflow-hidden">
      <div className="absolute w-full h-full">
        <div
          className={`container flex h-full ${
            style === 'left'
              ? `flex-col items-center justify-center md:flex-row`
              : `flex-col items-center justify-center`
          }`}
        >
          <div
            className={`flex flex-col justify-center md:w-2/3 z-10  ${
              style === 'left'
                ? `items-center text-pretty md:items-start`
                : `mb-8 items-center text-balance text-center`
            }`}
          >
            <h2 className="mb-8 text-2xl font-bold text-white md:text-5xl">{title}</h2>
            <h3
              className={`text-base text-light-300 md:text-lg text-white ${
                style === 'left' ? `text-left ` : `text-center`
              }`}
            >
              {text}
            </h3>
          </div>
          <div
            className={`flex w-full z-10 items-center justify-end md:w-1/3 ${
              style === 'left' ? `justify-end` : `justify-center`
            }`}
          >
            {link.internal?.slug && (
              <Button
                asChild
                variant="expandIcon"
                size="lg"
                Icon={IconArrowRight}
                iconPlacement="right"
                className="text-lg bg-primary hover:bg-primary/90 rounded-full"
              >
                <Link
                  href={link.internal.slug}
                  title={link.description}
                  aria-label={link.description}
                >
                  {link.linkText}
                </Link>
              </Button>
            )}
            {link.external?.slug && (
              <Button
                asChild
                variant="expandIcon"
                size="lg"
                Icon={IconArrowRight}
                iconPlacement="right"
                className="text-lg bg-primary hover:bg-primary/90 rounded-full"
              >
                <Link
                  href={link.external.slug}
                  title={link.description}
                  aria-label={link.description}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {link.linkText}
                </Link>
              </Button>
            )}
          </div>
          {decoration && <Meteors className="opacity-25 mt-32 ml-24" number={20} />}
        </div>
      </div>
      {image && (
        <ParallaxItem className="relative w-full h-full z-0" speed={speed}>
          <Image
            src={image.url}
            alt={image.alt}
            fill
            quality={35}
            sizes=" (max-width: 2000px) 45vw, 80vw"
            className="object-cover opacity-25"
          ></Image>
        </ParallaxItem>
      )}
    </section>
  )
}
