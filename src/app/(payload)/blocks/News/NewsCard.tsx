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
  data: {
    className?: string
    title: string
    summary: string
    badgeClass?: string
    shareClass?: string
    buttonVariant?: any
    image: {
      url: string
      alt: string
    }
  }
}
export default function NewsCard({ data }: NewsCardTypes) {
  return (
    <Card className="rounded-xl overflow-hidden">
      <Badge
        variant="secondary"
        className="w-fit m-6 absolute bg-primary/50 backdrop-blur-md text-white"
      >
        Secondary
      </Badge>
      <Image
        src={data.image.url}
        width={500}
        height={500}
        alt={data.image.alt}
        className="h-2/4 aspect-[4/3] object-cover"
      ></Image>
      <CardContent>
        <CardTitle className="mt-6 mb-3 line-clamp-1">{data.title}</CardTitle>
        <CardDescription className="line-clamp-4">{data.summary}</CardDescription>
        <div className="flex items-center gap-3 mt-6 h-11">
          <Button
            variant={data.buttonVariant}
            className="w-full flex gap-1 hover:bg-secondaryAlt/75 h-full"
            arrow
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
