'use client'
import * as React from 'react'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/lib/button'
import { Card, CardContent, CardDescription, CardTitle } from '@/components/lib/card'
import Image from 'next/image'
import { Badge } from '@/components/lib/badge'
import ShareButton from '@/components/lib/shareButton'
import { IconArrowRight, IconLoader2 } from '@tabler/icons-react'
import Link from 'next/link'
import { NewsCardProps } from '@/types/typesNP'
import getVideoId from 'get-video-id'
import ReactPlayer from 'react-player/lazy'
import { useState, useEffect } from 'react'
import { Skeleton } from './lib/skeleton'

export default function NewsCard({ data, className }: NewsCardProps) {
  const pathname = usePathname()
  const [currentUrl, setCurrentUrl] = useState('')
  const [isHovering, setIsHovering] = useState(false)
  const [isVideoReady, setIsVideoReady] = useState(false)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    if (typeof window !== 'undefined') {
      const baseUrl = window.location.origin
      setCurrentUrl(`${baseUrl}${pathname}/${data.slug}`)
    }
  }, [pathname, data.slug])

  const getVideoUrl = () => {
    if (data.videoUrl) {
      const getIDResult = getVideoId(data.videoUrl)
      return `https://www.youtube.com/watch?v=${getIDResult.id}`
    }
    return ''
  }

  const hasVideo = !!data.videoUrl

  const handleMouseEnter = () => {
    if (hasVideo) {
      setIsHovering(true)
    }
  }

  const handleMouseLeave = () => {
    if (hasVideo) {
      setIsHovering(false)
      setIsVideoReady(false)
    }
  }

  return (
    <Card
      className={`rounded-xl overflow-hidden hover:-translate-y-2 transform transition duration-300 ${
        hasVideo ? 'col-span-2 z-30 group' : 'col-span-1'
      } ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={`relative w-full  ${hasVideo ? 'h-full ' : 'h-72'}`}>
        {data.image && (
          <>
            <Skeleton
              className={`transition-generic rounded-xl${
                isHovering
                  ? 'w-full h-full absolute z-0 bg-black/75 mix-blend-soft-light opacity-100'
                  : 'opacity-0 '
              }`}
            ></Skeleton>

            <Image
              src={data.image.url}
              fill
              alt={data.image.alt || 'Imagen de noticia'}
              quality={10}
              sizes="(max-width: 1200px) 20vw, 35vw"
              className={`w-full -z-10 object-cover transition-opacity duration-300 opacity-100 transition-generic 
              ${isHovering && ' group-hover:blur-md group-hover:scale-105 '}
              ${isVideoReady && 'opacity-0 group-hover:blur group-hover:scale-105 '}`}
            />
          </>
        )}

        {isClient && hasVideo && isHovering && (
          <div className="absolute inset-0 flex items-center justify-center scale-150">
            <ReactPlayer
              url={getVideoUrl()}
              playing={true}
              muted={true}
              width="100%"
              height="100%"
              style={{ display: isVideoReady ? 'block' : 'none' }}
              onReady={() => setIsVideoReady(true)}
              config={{
                youtube: {
                  playerVars: { showinfo: 1 },
                },
              }}
            />
          </div>
        )}
      </div>
      {hasVideo ? (
        <CardContent className="absolute z-30 pl-8 pb-8 flex items-center w-full bottom-0">
          <div className="w-4/5 pr-5 z-20">
            <CardTitle className="text-white line-clamp-1 font-bold mb-1 text-lg">
              {data.title}
            </CardTitle>
            <CardDescription className="text-white line-clamp-2">{data.summary}</CardDescription>
          </div>
          <div className="w-1/5 flex justify-center">
            <Button
              variant="arrow"
              className="text-white bg-white/20 w-10 h-10 backdrop-blur-md"
            ></Button>
          </div>
        </CardContent>
      ) : (
        <CardContent className="p-6">
          <CardTitle className="mb-1 line-clamp-1 leading-normal text-xl">{data.title}</CardTitle>
          <CardDescription className="line-clamp-3">{data.summary}</CardDescription>
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
              url={currentUrl}
            />
          </div>
        </CardContent>
      )}
    </Card>
  )
}
