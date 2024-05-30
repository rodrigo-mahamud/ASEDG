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
}
export default function NewsCard({
  className,
  buttonVariant,
  badgeClass,
  shareClass,
}: NewsCardTypes) {
  return (
    <Card className={`rounded-xl overflow-hidden ${className}`}>
      <Badge
        variant="secondary"
        className={`w-fit m-6 absolute bg-primary/50 backdrop-blur-md text-white ${badgeClass}`}
      >
        Secondary
      </Badge>
      <Image
        src="/placeholder.jpg"
        width={500}
        height={500}
        alt="hola"
        className="h-2/4 aspect-[4/3] object-cover"
      ></Image>
      <CardContent>
        <CardTitle className="mt-6 mb-3">Create project</CardTitle>
        <CardDescription className="line-clamp-4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex voluptatum cupiditate quas
          assumenda natus laboriosam totam autem facere. Tempora eius at sequi quaerat nam nihil ab
          quisquam facere explicabo quas?
        </CardDescription>
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
