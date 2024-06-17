'use client'
import * as React from 'react'
import { Button } from '@/components/lib/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/lib/card'
import Image from 'next/image'
import { Badge } from '@/components/lib/badge'
import ShareButton from '@/components/lib/shareButton'
import { IconArrowRight } from '@tabler/icons-react'
import Link from 'next/link'
interface CatTypes {
  title: string
  description: string
}
interface NewsCardTypes {
  className?: string
  data: {
    slug: string
    categories: CatTypes[]
    title: string
    summary: string
    badgeClass?: string
    shareClass?: string
    image: {
      url: string
      alt: string
    }
  }
}
export default function NewsCard({ data, className }: NewsCardTypes) {
  return (
    <Card
      className={`rounded-xl overflow-hidden hover:-translate-y-2 transform transition duration-300  ${className}`}
    >
      <div className="relative w-full aspect-[4/3]">
        <Image
          src={data.image.url}
          fill
          alt={data.image.alt}
          quality={10}
          sizes="(max-width: 1200px) 20vw, 35vw"
          className="w-full -z-10 object-cover"
        ></Image>
      </div>
      <CardContent className="p-6">
        <div className="flex gap-2 mb-6">
          {data.categories.map((cat, index) => (
            <Badge key={index} className=" rounded-sm text-gray-800/70" variant="secondary">
              {cat.title}
            </Badge>
          ))}
        </div>

        <CardTitle className="mb-3 line-clamp-1 leading-[0.85]">{data.title}</CardTitle>
        <CardDescription className="line-clamp-4">{data.summary}</CardDescription>
        <div className="flex items-center gap-3 mt-6 h-11">
          <Button
            asChild
            variant="expandIcon"
            iconClass="w-4 h-4"
            Icon={IconArrowRight}
            iconPlacement="right"
            className="w-4/5 flex gap-1 bg-secondaryAlt hover:bg-secondaryAlt/90 rounded-md h-full"
          >
            <Link href={`noticias-san-esteban-de-gormaz/${data.slug}`}>Ver Más</Link>
          </Button>
          <ShareButton
            className="w-1/5 h-full outline-none bg-secondaryAlt/5 hover:bg-secondaryAlt/10 flex justify-center items-center rounded-md"
            url="https://stupendous-capybara-079a5c.netlify.app/"
          ></ShareButton>
        </div>
      </CardContent>
    </Card>
  )
}
