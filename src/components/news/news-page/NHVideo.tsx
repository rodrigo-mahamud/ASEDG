import Image from 'next/image'
import Container from '../../Container'
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar'
import { Badge } from '../../ui/badge'
import { Separator } from '../../ui/separator'
import ShareButton from '../../ui/shareButton'
import React from 'react'
import Link from 'next/link'
import { IconArrowNarrowLeft } from '@tabler/icons-react'
import { NewsItemFull } from '@/types/types'
import { Button } from '../../ui/button'
import LiteYouTubeEmbed from 'react-lite-youtube-embed'
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css'
import getVideoId from 'get-video-id'
interface NHVerticalProps {
  data: NewsItemFull

  currentUrl: string
}

export default function NHVideo({ data, currentUrl }: NHVerticalProps) {
  const VideoId = getVideoId(data.videoUrl)
  return (
    <div className="h-fit relative w-full">
      <Container className="py-28 px-0 z-10">
        <div className="w-full flex items-center gap-10">
          <div className="space-y-5 w-4/12">
            <Button
              asChild
              variant="arrowReversed"
              iconClass="w-3 h-3"
              className="bg-white/5 w-fit gap-1 hover:bg-white/10 mb-8 flex flex-row-reverse rounded-full text-white h-8 border-0"
            >
              <Link href="/noticias-san-esteban-de-gormaz" replace>
                Volver
              </Link>
            </Button>
            <h1 className="text-4xl font-bold text-white line-clamp-2">{data.title}</h1>
            <h2 className="text-lg text-white/65 line-clamp-3">{data.summary}</h2>

            <Separator className="opacity-20"></Separator>
            <div className="flex w-full justify-between">
              <div className="flex">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="flex flex-col ml-3">
                  <span className="text-sm text-white">Foulcher Nathanil</span>
                  <span className="text-xs text-white/65">May 20, 2021 · 2 min read</span>
                </div>
              </div>

              <ShareButton
                iconStroke="1.5"
                className="w-10 h-10 ml-3 outline-none text-white bg-white/5 hover:bg-white/10 flex justify-center items-center rounded-full"
                url={currentUrl}
              />
            </div>
          </div>

          <div className="relative w-8/12 aspect-video rounded-[2rem] overflow-hidden border-4 border-white shadow-xl">
            {VideoId.id && (
              <LiteYouTubeEmbed
                id={VideoId.id}
                poster="hqdefault"
                playerClass="playButton"
                title={`Vídeo de la noticia ${data.title}`}
              />
            )}
          </div>
        </div>
      </Container>
      <div className="absolute bg-[#111827] h-full w-1/2 z-0 top-0 rounded-r-[2.75rem]"></div>
    </div>
  )
}
