import * as React from 'react'
import { Button } from '@/components/lib/button'
import { Card, CardContent, CardDescription, CardTitle } from '@/components/lib/card'
import Image from 'next/image'
import Container from '@/components/Container'
import Title from '@/components/lib/title'
import DynamicIcon from '@/components/DynamicIcon' // Asegúrate de ajustar la ruta según tu estructura de carpetas
import { Type } from '.'
import Link from 'next/link'
import Filter from './Filter'

export default function NewsCard({ cards, title, description }: Type) {
  return (
    <Container>
      <Title title={title} subtitle={description}></Title>
      <Filter></Filter>
      <div className="grid grid-cols-4 w-full gap-8">
        {cards.map((item, index) => (
          <Card
            key={index}
            className="rounded-xl  h-full overflow-hidden hover:-translate-y-2 transform transition duration-300 btnShadow"
          >
            <div className="aspect-[4/3] relative">
              <Image
                src={item.cardImage.url}
                fill
                quality={15}
                sizes="(max-width: 1200px) 25vw, 50vw"
                alt={item.cardImage.alt}
              />
            </div>
            <CardContent className="p-5">
              <CardTitle className="mb-3 line-clamp-1">{item.title}</CardTitle>
              <CardDescription className="line-clamp-4">{item.description}</CardDescription>
              <div className="flex items-center justify-between gap-2 mt-6 h-10">
                {item.links.link.map((linkItem, linkIndex) => {
                  switch (linkItem.linkType) {
                    case 'internal':
                      return (
                        <Button
                          key={linkIndex}
                          variant="ringHover"
                          className="w-full flex gap-1 bg-secondaryAlt hover:bg-secondaryAlt/90 rounded-md h-full"
                        >
                          <Link href={linkItem.internal}>{linkItem.linkText}</Link>
                        </Button>
                      )
                    case 'external':
                      return (
                        <Button
                          key={linkIndex}
                          variant="ringHover"
                          className="w-full flex gap-1 bg-secondaryAlt hover:bg-secondaryAlt/90 rounded-md h-full"
                        >
                          <Link href={linkItem.external}>{linkItem.linkText}</Link>
                        </Button>
                      )
                    case 'location':
                      return (
                        <Button
                          key={linkIndex}
                          variant="secondary"
                          className="w-10 flex gap-1 bg-secondary hover:bg-secondary/90 rounded-md h-[inherit] text-foreground"
                        >
                          <Link href={linkItem.location}>
                            <DynamicIcon iconName={linkItem.linkIcon} />
                          </Link>
                        </Button>
                      )
                    case 'tel':
                      return (
                        <Button
                          key={linkIndex}
                          variant="secondary"
                          className="w-10 flex gap-1 bg-secondary hover:bg-secondary/90 rounded-md h-[inherit] text-foreground"
                        >
                          <Link href={linkItem.tel}>
                            <DynamicIcon iconName={linkItem.linkIcon} />
                          </Link>
                        </Button>
                      )
                    default:
                      return null
                  }
                })}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </Container>
  )
}
