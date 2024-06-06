import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import ParallaxItem from '@/components/ParallaxItem'
import * as Icons from '@tabler/icons-react' // Importa todos los iconos
import { Button } from './ui/button'
import { LinkButton } from './ui/linkButton'

interface ImageTextProps {
  data: {
    isReversed: string
    title: string
    body: string
    img: string
    list: {
      [key: string]: {
        icon: string
        text: string
      }
    }
    linkText: string
    link: string
  }
}

export default function TextImagesBlock({ data }: ImageTextProps) {
  const { isReversed, title, body, img, list, linkText, link } = data
  const shouldReverse = isReversed === 'true'

  const listItems = Object.entries(list).map(([key, { icon, text }]) => {
    const IconComponent = (Icons as any)[icon]
    return (
      <li key={key} className="mb-2 flex items-center">
        {IconComponent && (
          <IconComponent className="stroke-1.5 mr-2 h-7 w-7 md:mr-1.5 md:h-5 md:w-5" />
        )}
        <span className="line-clamp-1 text-base md:text-lg">{text}</span>
      </li>
    )
  })

  return (
    <section
      className={`flex container py-32 flex-col gap-8 md:gap-16 ${
        shouldReverse ? 'md:flex-row-reverse' : 'md:flex-row'
      }`}
    >
      <div className="flex md:w-1/2 overflow-hidden rounded-xl">
        <ParallaxItem className="aspect-[4/3] w-full" speed={1.15}>
          <Image
            src={img}
            fill
            className="mt-10 w-full object-cover md:mt-0 scale-110 translate-y-8"
            quality={50}
            sizes="(max-width: 768px) 35vw, (max-width: 1200px) 50vw, 75vw"
            alt={title}
          />
        </ParallaxItem>
      </div>
      <div className="flex items-start justify-center md:w-1/2">
        <div className="flex flex-col justify-start">
          <h2 className="mb-2 text-3xl font-cal md:mb-5 md:text-3xl">{title}</h2>
          <p className="text-base md:text-lg">{body}</p>
          <ul className="py-5 md:pl-3">{listItems}</ul>
          <LinkButton
            href={link}
            variant="secondary"
            className="text-lg px-8 py-6 rounded-full stroke-[1.5] flex gap-1 w-fit hover:bg-secondaryAlt/75"
            arrow
          >
            {linkText}
          </LinkButton>
        </div>
      </div>
    </section>
  )
}
