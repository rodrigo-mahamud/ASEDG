'use client'
import * as React from 'react'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card'
import Image from 'next/image'
import ShareButton from '@/components/ui/shareButton'
import { IconArrowRight } from '@tabler/icons-react'
import Link from 'next/link'
import getVideoId from 'get-video-id'
import ReactPlayer from 'react-player/lazy'
import { useState, useEffect } from 'react'
import { News, Media } from '@/payload-types'

interface NewsCardProps {
  data: News
  className?: string
}

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

  const getImageUrl = (image: string | Media | null | undefined): string => {
    if (typeof image === 'string') return image
    return (image as Media)?.url || ''
  }

  const getImageAlt = (image: string | Media | null | undefined): string => {
    if (typeof image === 'string') return ''
    return (image as Media)?.alt || data.title
  }
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' }
    return new Date(dateString).toLocaleDateString('es-ES', options)
  }
  return (
    <Card
      className={`rounded-xl overflow-hidden hover:-translate-y-2 transform-gpu transition-generic group ${
        hasVideo
          ? 'aspect-[9/16] lg:aspect-auto lg:col-span-2 z-30 group hover:cursor-pointer hover:rounded-2xl'
          : 'col-span-1'
      } ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className={`flex gap-2 z-20 absolute top-0 opacity-0 group-hover:opacity-100 transition-generic 
           ${hasVideo ? ' m-8 text-sm ' : 'm-5 text-xs'}`}
      >
        {data.categories.map((cat, index) => (
          <div key={index} className="bg-white/15 backdrop-blur-md rounded-full z-20">
            <p className="text-white px-4 my-1 leading-normal">
              {typeof cat === 'string' ? cat : cat.title}
            </p>
          </div>
        ))}
      </div>
      <div
        className={`relative w-full ${
          hasVideo ? 'h-full rounded-xl group-hover:rounded-2xl overflow-hidden' : 'h-56'
        }`}
      >
        <Link href={`noticias-san-esteban-de-gormaz/${data.slug || ''}`}>
          {isClient && hasVideo && <div className="absolute w-full h-full blurMaskAlt z-10"></div>}
          {(data.masonryImages?.masonryImage1 || data.image) && (
            <>
              <Image
                src={getImageUrl(data.masonryImages?.masonryImage1) || getImageUrl(data.image)}
                fill
                alt={getImageAlt(data.masonryImages?.masonryImage1) || getImageAlt(data.image)}
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
          <div className="absolute inset-0 flex items-center justify-center group-hover:rounded-2xl rounded-xl scale-[1.85]">
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
          <time className="text-xs text-muted-foreground" dateTime={data.publishedDate}>
            {formatDate(data.publishedDate)}
          </time>
          <CardTitle className="line-clamp-1 text-xl mt-1">{data.title}</CardTitle>
          <CardDescription className="line-clamp-3 mt-2 mb-3">{data.summary}</CardDescription>
          <div className="flex items-center gap-3 h-10">
            <Button
              asChild
              variant="expandIcon"
              iconClass="w-4 h-4"
              Icon={IconArrowRight}
              iconPlacement="right"
              className="w-4/5 flex gap-1 bg-secondaryAlt hover:bg-secondaryAlt/90 rounded-md h-full"
            >
              <Link href={`noticias-san-esteban-de-gormaz/${data.slug || ''}`}>Ver Más</Link>
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
