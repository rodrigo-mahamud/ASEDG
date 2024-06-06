import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import ParallaxItem from '@/components/ParallaxItem'
import * as Icons from '@tabler/icons-react' // Importa todos los iconos
import { Button } from '@/components/lib/button'

interface ListTypes {
  text: string
  icon: string
}

interface ImageTextProps {
  isReversed: string
  title: string
  body: string
  image: {
    url: string
  }
  list: ListTypes[]
  linkText: string
  link: {
    slug: string
  }
}

export default function TextImagesBlock({
  isReversed,
  title,
  body,
  image,
  list,
  linkText,
  link,
}: ImageTextProps) {
  const shouldReverse = isReversed === 'true'

  return (
    <section
      className={`flex container py-32 flex-col gap-8 md:gap-16 ${
        shouldReverse ? 'md:flex-row-reverse' : 'md:flex-row'
      }`}
    >
      <div className="flex md:w-1/2 overflow-hidden rounded-xl">
        <ParallaxItem className="aspect-[4/3] w-full" speed={1.15}>
          <Image
            src={image.url}
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
          <ul className="py-5 md:pl-3">
            {list.map((item, index) => {
              const IconComponent = (Icons as any)[item.icon]
              return (
                <li key={index} className="mb-2 flex items-center">
                  {IconComponent && (
                    <IconComponent className="stroke-1.5 mr-2 h-7 w-7 md:mr-1.5 md:h-5 md:w-5" />
                  )}
                  <span className="line-clamp-1 text-base md:text-lg">{item.text}</span>
                </li>
              )
            })}
          </ul>
          <Button
            asChild
            variant="expandIcon"
            size="lg"
            Icon={Icons.IconArrowRight}
            iconPlacement="right"
            className="text-lg bg-primary hover:bg-primary/90 rounded-full py-0 px-8 w-fit"
          >
            <Link href={link.slug}>{linkText}</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
