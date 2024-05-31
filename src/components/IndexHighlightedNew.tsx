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
interface NewsCardTypes {
  className?: string
  badgeClass?: string
  shareClass?: string
  buttonVariant?: any
  title: string
  summary: string
  image: Image
}
interface Image {
  id: number
  alt: string
  url: string
}

export default function IndexHighlightedNew({
  className,
  buttonVariant,
  badgeClass,
  shareClass,
  title,
  summary,
  image,
}: NewsCardTypes) {
  return (
    <Card className=" overflow-hidden relative flex flex-col gap-6 bg-secondary p-6">
      <CardContent>
        <div className="flex w-full flex-col">
          <CardTitle className="mb-3 line-clamp-1">{title}</CardTitle>
          <CardDescription className="line-clamp-3 mb-3">{summary}</CardDescription>
        </div>
        <div className="flex w-full gap-3">
          <Button
            variant={buttonVariant}
            className="flex gap-1 hover:bg-secondaryAlt/75 w-5/6"
            arrow
          >
            Ver más
          </Button>
          <ShareButton
            className={`w-1/6 outline-none bg-secondaryAlt/5 hover:bg-secondaryAlt/10 flex justify-center items-center rounded-md ${shareClass}`}
            url="https://stupendous-capybara-079a5c.netlify.app/"
          ></ShareButton>
        </div>
      </CardContent>
      <div className="h-[35rem] relative overflow-hidden rounded-md">
        <Image src={image.url} fill alt={image.alt} className=" object-cover w-full h-full"></Image>
      </div>
    </Card>
  )
}
