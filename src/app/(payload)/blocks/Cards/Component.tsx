import * as React from 'react'
import { Button } from '@/components/lib/button'
import { Card, CardContent, CardDescription, CardTitle } from '@/components/lib/card'
import Image from 'next/image'
import { Badge } from '@/components/lib/badge'
import { IconArrowRight } from '@tabler/icons-react'
import { Type } from '.'
import Container from '@/components/Container'
import Title from '@/components/lib/title'

export default function NewsCard({ cards, title, description }: Type) {
  return (
    <Container>
      <Title title={title} subtitle={description}></Title>
      <div className="flex w-full gap-4">
        {cards.map((item, index) => (
          <Card
            key={index}
            className="rounded-xl p-5 w-1/4 h-full overflow-hidden hover:-translate-y-2 transform transition duration-300 btnShadow"
          >
            <Image
              src={item.cardImage.url}
              width={item.cardImage.width}
              height={item.cardImage.height}
              quality={25}
              sizes=" (max-width: 2000px) 25%, 50%"
              alt={item.cardImage.alt}
              className="object-cover aspect-[4/3] rounded-md"
            ></Image>
            <CardContent className="">
              <CardTitle className="mb-3 mt-6 line-clamp-1">{item.title}</CardTitle>
              <CardDescription className="line-clamp-4">{item.description}</CardDescription>
              <div className="flex items-center gap-3 mt-6 h-11">
                <Button
                  variant="expandIcon"
                  Icon={IconArrowRight}
                  iconPlacement="right"
                  className="w-full flex gap-1 bg-secondaryAlt hover:bg-secondaryAlt/90 rounded-md h-full"
                >
                  Ver más
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </Container>
  )
}
