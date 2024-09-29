import React from 'react'
import ImagesMasonry from '../../ImagesMasonry'
import { Separator } from '../../lib/separator'
import { Badge } from '../../lib/badge'
import Container from '../../Container'
import { Avatar, AvatarFallback, AvatarImage } from '../../lib/avatar'
import ShareButton from '../../lib/shareButton'
import { Button } from '../../lib/button'
import { IconArrowNarrowLeft } from '@tabler/icons-react'
import { NewsItemFull } from '@/types/types'
import Link from 'next/link'

interface NHGalleryProps {
  data: NewsItemFull
  currentUrl: string
}

export default function NHGallery({ data, currentUrl }: NHGalleryProps) {
  const imageSrcs = data.masonryImages
    ? [
        data.masonryImages.masonryImage1.url,
        data.masonryImages.masonryImage2.url,
        data.masonryImages.masonryImage3.url,
        data.masonryImages.masonryImage4.url,
        data.masonryImages.masonryImage5.url,
      ]
    : []

  const imageAlts = data.masonryImages
    ? [
        data.masonryImages.masonryImage1.alt,
        data.masonryImages.masonryImage2.alt,
        data.masonryImages.masonryImage3.alt,
        data.masonryImages.masonryImage4.alt,
        data.masonryImages.masonryImage5.alt,
      ]
    : []

  return (
    <>
      <Container className="pb-0 pt-11">
        <Button
          asChild
          variant="arrowReversed"
          iconClass="w-3 h-3"
          className="bg-secondaryAlt/5 w-fit gap-1 hover:bg-secondaryAlt/10 mb-8 flex flex-row-reverse rounded-full text-foreground h-8 border-0"
        >
          <Link href="/noticias-san-esteban-de-gormaz" replace>
            Volver
          </Link>
        </Button>
        <div className="space-y-5 mx-auto pb-10">
          <h1 className="text-5xl font-bold mb-4 text-pretty">{data.title}</h1>
          <h2 className="text-lg text-muted-foreground line-clamp-3">{data.summary}</h2>
          <Separator />
          <div className="flex w-full justify-between">
            <div className="flex">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>

              <div className="flex flex-col ml-3">
                <span className="text-sm">Foulcher Nathanil</span>
                <span className="text-xs">May 20, 2021 · 2 min read</span>
              </div>
            </div>
            <div className="flex">
              <div className="flex gap-2 pr-3 border-r border-border h-10">
                {data.categories.map((cat, index) => (
                  <Badge key={index} variant={'outline'} className="bg-secondaryAlt/5 h-10 px-4">
                    {cat.title}
                  </Badge>
                ))}
              </div>
              <ShareButton
                iconStroke="1.5"
                className="w-10 h-10 ml-3 outline-none bg-secondaryAlt/5 hover:bg-secondaryAlt/10 flex justify-center items-center rounded-full"
                url={currentUrl}
              />
            </div>
          </div>
        </div>
        <ImagesMasonry imageSrcs={imageSrcs} imageAlts={imageAlts} />
      </Container>
    </>
  )
}
