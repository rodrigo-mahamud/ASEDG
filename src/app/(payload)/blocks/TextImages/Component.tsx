import React from 'react'
import Image from 'next/image'

import { Type } from '.'
import RichTextParser from '@/utils/richTextParser'

export default function TextImagesBlock({ isReversed, title, text, image, list }: Type) {
  return (
    <section
      className={`flex container py-32 flex-col gap-14  ${
        isReversed ? 'md:flex-row-reverse' : 'md:flex-row'
      }`}
    >
      <div className="flex relative md:w-2/5 overflow-hidden rounded-xl aspect-[9/10]">
        <Image
          src={image.url}
          fill
          className="w-full object-cover "
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          quality={35}
          alt={image.alt}
        />
      </div>
      <div className="flex items-start justify-center md:w-3/5">
        <div className="flex flex-col justify-start">
          <h2 className="mb-2 text-3xl font-semibold md:mb-5 md:text-3xl">{title}</h2>
          <RichTextParser className="text-foreground/80" content={text}></RichTextParser>
        </div>
      </div>
    </section>
  )
}
