'use client'
import * as React from 'react'
import { Button } from '@/components/lib/button'
import { Card, CardContent, CardDescription, CardTitle } from '@/components/lib/card'
import Image from 'next/image'
import Container from '@/components/Container'
import Title from '@/components/lib/title'
import DynamicIcon from '@/components/DynamicIcon'
import { Type } from '.'
import Link from 'next/link'
import Filter from './Filter'
import { Badge } from '@/components/lib/badge'
import CardButtons from './CardButtons' // Asegúrate de ajustar la ruta según tu estructura de carpetas

export default function NewsCard({ cards, title, description, filter }: Type) {
  const [filteredCards, setFilteredCards] = React.useState(cards)
  const [selectedCategory, setSelectedCategory] = React.useState(null)

  const handleFilterChange = (category: any) => {
    if (selectedCategory === category) {
      setSelectedCategory(null)
      setFilteredCards(cards)
    } else {
      setSelectedCategory(category)
      setFilteredCards(
        cards.filter((card) => card.categories.some((cat) => cat.title === category)),
      )
    }
  }
  const generateGoogleMapsLink = (location: string) => {
    const encodedLocation = encodeURIComponent(location)
    return `https://www.google.com/maps/dir//${encodedLocation}`
  }

  return (
    <Container>
      <Title title={title} subtitle={description}></Title>
      {filter && (
        <Filter
          data={cards}
          onFilterChange={handleFilterChange}
          selectedCategory={selectedCategory}
        ></Filter>
      )}
      <div className="grid grid-cols-4 w-full gap-8">
        {filteredCards.map((item, index) => (
          <Card
            key={index}
            className="rounded-xl h-full overflow-hidden hover:-translate-y-2 transform transition duration-300 btnShadow"
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
              {item.categories.slice(0, 1).map((category, catIndex) => (
                <Badge
                  className="mb-3 rounded-sm text-gray-800/70"
                  key={catIndex}
                  variant="secondary"
                >
                  {category.title}
                </Badge>
              ))}

              <CardTitle className="mb-3 line-clamp-1">{item.title}</CardTitle>
              <CardDescription className="line-clamp-4">{item.description}</CardDescription>
              <CardButtons
                links={item.links.link}
                generateGoogleMapsLink={generateGoogleMapsLink}
              />
            </CardContent>
          </Card>
        ))}
      </div>
    </Container>
  )
}
