import Image from 'next/image'
import Container from '../../Container'
import { Avatar, AvatarFallback, AvatarImage } from '../../lib/avatar'
import { Badge } from '../../lib/badge'
import { Separator } from '../../lib/separator'
import ShareButton from '../../lib/shareButton'
import React from 'react'
import Link from 'next/link'
import { IconArrowNarrowLeft } from '@tabler/icons-react'
import { NewsItemFull } from '@/types/types'
import { Button } from '../../lib/button'
interface NHVerticalProps {
  data: NewsItemFull

  currentUrl: string
}

export default function NHVertical({ data, currentUrl }: NHVerticalProps) {
  return (
    <>
      <Container className="pb-10 pt-11">
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
        <div className="space-y-5 ">
          <h1 className="text-5xl font-bold">{data.title}</h1>
          <h2 className="text-lg text-muted-foreground line-clamp-3">{data.summary}</h2>

          <Separator></Separator>
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

        <div className="relative w-full aspect-video mt-10">
          <Image
            src={data.image.url}
            fill
            className=" w-full object-cover rounded-2xl"
            quality={50}
            sizes="(max-width: 768px) 35vw, (max-width: 1200px) 50vw, 75vw"
            alt={data.image.alt}
          />
        </div>
      </Container>
    </>
  )
}
