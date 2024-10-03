import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import ParallaxItem from '@/components/ParallaxItem'
import * as Icons from '@tabler/icons-react' // Importa todos los iconos
import { Button } from '@/components/lib/button'
import { Type } from '.'
import RichTextParser from '@/utils/richTextParser'

export default function TextImagesBlock({
  isReversed,
  title,
  text,
  image,
  list,
  linkText,
  link,
}: Type) {
  return (
    <section
      className={`flex container py-32 flex-col gap-10  ${
        isReversed ? 'md:flex-row-reverse' : 'md:flex-row'
      }`}
    >
      <div className="flex md:w-2/5 overflow-hidden rounded-xl">
        <ParallaxItem className="aspect-[4/3] w-full" speed={1.15}>
          <Image
            src={image.url}
            fill
            className="mt-10 w-full object-cover scale-125 "
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            quality={35}
            alt={image.alt}
          />
        </ParallaxItem>
      </div>
      <div className="flex items-start justify-center md:w-3/5">
        <div className="flex flex-col justify-start">
          <h2 className="mb-2 text-3xl font-semibold md:mb-5 md:text-3xl">{title}</h2>
          <RichTextParser content={text}></RichTextParser>
          <ul className="pt-5">
            {list.map((item, index) => {
              const IconComponent = (Icons as any)[item.icon]
              return (
                <li
                  key={index}
                  className={` ${item.isblold ? 'ml-0' : 'ml-5'}mb-2 flex items-center`}
                >
                  {IconComponent && (
                    <IconComponent className="stroke-1.5 mr-2 h-7 w-7 md:mr-1.5 md:h-5 md:w-5" />
                  )}
                  <div className="flex flex-col">
                    <h3
                      className={`line-clamp-1 text-base md:text-lg ${
                        item.isblold ? 'font-semibold' : ''
                      }`}
                    >
                      {item.text}
                    </h3>
                    {item.listImage && (
                      <Image
                        className="mt-2"
                        src={item.listImage.url}
                        alt={item.listImage.alt}
                        width={130}
                        height={65}
                      ></Image>
                    )}
                  </div>
                </li>
              )
            })}
          </ul>
          {link && (
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
          )}
        </div>
      </div>
    </section>
  )
}
