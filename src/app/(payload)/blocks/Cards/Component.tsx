'use client'
import * as React from 'react'
import { Button } from '@/components/lib/button'
import { Card, CardContent, CardDescription, CardTitle } from '@/components/lib/card'
import Image from 'next/image'
import Container from '@/components/Container'
import Title from '@/components/lib/title'
import { Type } from '.'
import { Badge } from '@/components/lib/badge'
import CardButtons from './CardButtons' // Asegúrate de ajustar la ruta según tu estructura de carpetas
import FilteredCards from '@/components/FilteredCards'

export default function CardsBlock({ cards, title, description, filter }: Type) {
  const generateGoogleMapsLink = (location: string) => {
    const encodedLocation = encodeURIComponent(location)
    return `https://www.google.com/maps/dir//${encodedLocation}`
  }

  return (
    <Container>
      hola
      {/* <Title title={title} subtitle={description}></Title>
      <FilteredCards data={cards} filterEnabled={filter} className="grid grid-cols-4 w-full gap-8">
        {(item) => (
          <Card className="rounded-xl h-full overflow-hidden hover:-translate-y-2 transform transition duration-300 btnShadow">
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
              <div className="flex gap-2 mb-6">
                {item.categories.slice(0, 2).map((category: any, catIndex: any) => (
                  <Badge
                    className="mb-3 rounded-sm text-gray-800/70"
                    key={catIndex}
                    variant="secondary"
                  >
                    {category.title}
                  </Badge>
                ))}
              </div>

              <CardTitle className="mb-3 line-clamp-1">{item.title}</CardTitle>
              <CardDescription className="line-clamp-4">{item.description}</CardDescription>
              <CardButtons
                links={item.links.link}
                generateGoogleMapsLink={generateGoogleMapsLink}
              />
            </CardContent>
          </Card>
        )}
      </FilteredCards> */}
    </Container>
  )
}
