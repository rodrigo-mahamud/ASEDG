import * as React from 'react'
import { Button } from '@/components/lib/button'
import { Card, CardContent, CardDescription, CardTitle } from '@/components/lib/card'
import Image from 'next/image'

import ShareButton from '@/components/lib/shareButton'
import { NewsItemBase } from '@/types/typesNP'

export default function IndexHighlightedNew({
  shareClass,
  title,
  summary,
  image,
  masonryImages,
  videoUrl,
}: NewsItemBase) {
  console.log(masonryImages)

  const imageUrl = masonryImages?.masonryImage1?.url || image?.url
  const imageAlt = masonryImages?.masonryImage1?.alt || image?.alt

  return (
    <Card className="overflow-hidden relative flex flex-col gap-6 bg-secondary p-6">
      <CardContent>
        <div className="flex w-full flex-col">
          <CardTitle className="mb-3 line-clamp-1">{title}</CardTitle>
          <CardDescription className="line-clamp-3 mb-3">{summary}</CardDescription>
        </div>
        <div className="flex w-full gap-3">
          <Button variant="shine" className="flex gap-1 hover:bg-secondaryAlt/75 w-5/6">
            Ver más
          </Button>
          <ShareButton
            className={`w-1/6 outline-none bg-secondaryAlt/5 hover:bg-secondaryAlt/10 flex justify-center items-center rounded-md ${shareClass}`}
            url="https://stupendous-capybara-079a5c.netlify.app/"
          ></ShareButton>
        </div>
      </CardContent>
      <div className="h-[28rem] relative overflow-hidden rounded-md">
        {imageUrl && (
          <Image
            src={imageUrl}
            fill
            alt={imageAlt || 'Image'}
            quality={5}
            sizes="(max-width: 1200px) 15vw, 25vw"
            className="object-cover w-full h-full"
          />
        )}
        {videoUrl && <div>Va el video</div>}
      </div>
    </Card>
  )
}
