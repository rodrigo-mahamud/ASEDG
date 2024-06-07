import * as React from 'react'
import { Button } from '@/components/lib/button'
import { Card, CardContent, CardDescription, CardTitle } from '@/components/lib/card'
import Image from 'next/image'
import { Badge } from '@/components/lib/badge'
import { IconArrowRight } from '@tabler/icons-react'
import { Type } from '.'

export default function NewsCard({ cards }: Type) {
  return (
    <>
      {cards.map((item, index) => (
        <Card
          key={index}
          className="rounded-xl overflow-hidden hover:-translate-y-2 transform transition duration-300"
        >
          <Image
            src={item.image.url}
            width={500}
            height={500}
            alt={item.image.alt}
            className="h-2/4 aspect-[4/3] object-cover"
          ></Image>
          <CardContent className="p-6 pt-0">
            <CardTitle className="mt-6 mb-3 line-clamp-1">{item.title}</CardTitle>
            <CardDescription className="line-clamp-4">{item.description}</CardDescription>
            <div className="flex items-center gap-3 mt-6 h-11">
              <Button
                variant="expandIcon"
                Icon={IconArrowRight}
                iconPlacement="right"
                className="w-4/5 flex gap-1 bg-secondaryAlt hover:bg-secondaryAlt/90 rounded-md h-full"
              >
                Ver más
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  )
}
