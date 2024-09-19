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
      className={`rounded-xl  overflow-hidden hover:-translate-y-2 transform-gpu transition-generic ${
        hasVideo ? 'col-span-2 z-30 group hover:cursor-pointer hover:rounded-2xl' : 'col-span-1'
      } ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex gap-2 m-8 z-20 absolute top-0 opacity-0 group-hover:opacity-100 transition-generic">
        {data.categories.map((cat, index) => (
          <div key={index} className="bg-white/15 backdrop-blur-md rounded-full">
            <p className="text-white px-4 my-1 text-sm leading-normal">{cat.title}</p>
          </div>
        ))}
      </div>
      <div
        className={`relative w-full  ${
          hasVideo ? 'h-full rounded-xl group-hover:rounded-2xl  overflow-hidden' : 'h-72'
        }`}
      >
        <Link href={`noticias-san-esteban-de-gormaz/${data.slug}`}>
          {isClient && hasVideo && <div className="absolute w-full h-full blurMaskAlt z-10"></div>}
          {(data.masonryImages?.masonryImage1 || data.image) && (
            <>
              <Image
                src={data.masonryImages?.masonryImage1?.url || data.image?.url}
                fill
                alt={data.masonryImages?.masonryImage1?.alt || data.image?.alt}
                quality={5}
                sizes="(max-width: 1200px) 15vw, 25vw"
                className={`w-full -z-10 object-cover duration-300 opacity-100 transition-generic 
                  ${hasVideo && 'scale-[1.005]'}
                  ${isHovering && 'blur scale-105 group-hover:rounded-2xl rounded-xl saturate-0'}
                  ${isVideoReady && 'opacity-0 group-hover:blur group-hover:scale-105 '}`}
              />
            </>
          )}
        </Link>

        {isClient && hasVideo && isHovering && (
          <div className="absolute inset-0 flex items-center justify-center group-hover:rounded-2xl rounded-xl scale-150">
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
        <CardContent className="absolute z-30 p-0 w-full bottom-0">
          <div className="w-full absolute bottom-0 z-20 p-6 translate-y-0 group-hover:-translate-y-12 transition-generic ">
            <CardTitle className="text-white line-clamp-1 font-bold mb-1 text-xl">
              {data.title}
            </CardTitle>
            <CardDescription className="text-white/75 line-clamp-2">{data.summary}</CardDescription>
          </div>
          <div className="flex justify-center w-full backdrop-blur-md opacity-0 group-hover:opacity-100 transition-generic bg-white/15">
            <Button variant="ghost" className="text-white py-4 h-fit">
              <span className="mr-1 text-base">Ver Vídeo</span>
            </Button>
          </div>
        </CardContent>
      ) : (
        <CardContent className="p-5">
          <CardTitle className="mb-1 line-clamp-1 leading-normal text-xl">{data.title}</CardTitle>
          <CardDescription className="line-clamp-3">{data.summary}</CardDescription>
          <div className="flex items-center gap-3 mt-5 h-10">
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
