import * as React from 'react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import ShareButton from '@/components/ui/shareButton'
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

export default function NewsCard({
  className,
  buttonVariant,
  badgeClass,
  shareClass,
  title,
  summary,
  image,
}: NewsCardTypes) {
  return (
    <Card className={`rounded-xl overflow-hidden ${className} useTw`}>
      <Badge
        variant="secondary"
        className={`w-fit m-6 absolute bg-primary/50 backdrop-blur-md text-white ${badgeClass}`}
      >
        Secondary
      </Badge>
      <Image
        src={image.url}
        width={500}
        height={500}
        alt={image.alt}
        className="h-2/4 aspect-[4/3] object-cover"
      ></Image>
      <CardContent>
        <CardTitle className="mt-6 mb-3 line-clamp-1">{title}</CardTitle>
        <CardDescription className="line-clamp-4">{summary}</CardDescription>
        <div className="flex items-center gap-3 mt-6 h-11">
          <Button
            variant={buttonVariant}
            className="w-full flex gap-1 hover:bg-secondaryAlt/75 h-full"
            arrow
          >
            Ver más
          </Button>
          <ShareButton
            className={`w-1/5 h-full outline-none bg-secondaryAlt/5 hover:bg-secondaryAlt/10 flex justify-center items-center rounded-md ${shareClass}`}
            url="https://stupendous-capybara-079a5c.netlify.app/"
          ></ShareButton>
        </div>
      </CardContent>
    </Card>
  )
}
