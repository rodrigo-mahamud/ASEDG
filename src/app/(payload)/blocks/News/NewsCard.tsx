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
interface CatTypes {
  title: string
  description: string
}
interface NewsCardTypes {
  className?: string
  data: {
    categorias: CatTypes[]
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
      <Badge
        variant="secondary"
        className="w-fit m-6 absolute backdrop-blur-md font-medium text-white bg-secondaryAlt/15"
      >
        {data.categorias[0].title}
      </Badge>
      <Image
        src={data.image.url}
        width={500}
        height={500}
        alt={data.image.alt}
        className="h-2/4 aspect-[4/3] object-cover"
      ></Image>
      <CardContent className="p-6 pt-0">
        <CardTitle className="mt-6 mb-3 line-clamp-1">{data.title}</CardTitle>
        <CardDescription className="line-clamp-4">{data.summary}</CardDescription>
        <div className="flex items-center gap-3 mt-6 h-11">
          <Button
            variant="expandIcon"
            Icon={IconArrowRight}
            iconPlacement="right"
            className="w-4/5 flex gap-1 bg-secondaryAlt hover:bg-secondaryAlt/90 rounded-md h-full"
          >
            Ver más
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
