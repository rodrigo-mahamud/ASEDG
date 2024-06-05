import React from 'react'
import { Type } from '.'
import { LinkButton } from '@/components/lib/linkButton'
import { Meteors } from '@/components/lib/meteors'
import { Button } from '@/components/lib/button'
import { IconArrowRight } from '@tabler/icons-react'
import Link from 'next/link'
import Image from 'next/image'

export default function CallToAction({ title, text, image, link, linkText, style }: Type) {
  return (
    <section className="w-full relative h-96 my-32 bg-[#030122] overflow-hidden">
      <div
        className={`relative flex h-full container mx-auto  ${
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
          <h2 className="mb-4 text-2xl font-bold text-white md:text-5xl">{title}</h2>
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
          <Button
            asChild
            variant="expandIcon"
            size="lg"
            Icon={IconArrowRight}
            iconPlacement="right"
            className="text-lg bg-primary hover:bg-primary/90 rounded-full"
          >
            <Link href={link.slug}>{linkText}</Link>
          </Button>
        </div>
        <Meteors className="opacity-25" number={20} />
      </div>
      {image && (
        <Image src={image.url} alt={image.alt} fill className="object-cover opacity-25"></Image>
      )}
    </section>
  )
}
