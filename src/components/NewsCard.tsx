'use client'
import * as React from 'react'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/lib/button'
import { Card, CardContent, CardDescription, CardTitle } from '@/components/lib/card'
import Image from 'next/image'
import { Badge } from '@/components/lib/badge'
import ShareButton from '@/components/lib/shareButton'
import { IconArrowRight } from '@tabler/icons-react'
import Link from 'next/link'
import { NewsCardProps } from '@/types/typesNP'
import getVideoId from 'get-video-id'
import ReactPlayer from 'react-player/lazy'
import { useState, useEffect } from 'react'

export default function NewsCard({ data, className }: NewsCardProps) {
  const pathname = usePathname()
  const [currentUrl, setCurrentUrl] = useState('')
  const [isPlaying, setIsPlaying] = useState(false)
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

  return (
    <Card
      className={`rounded-xl overflow-hidden hover:-translate-y-2 transform transition duration-300 ${className}`}
    >
      <div className="relative w-full aspect-[1/1]">
        {(data.masonryImages?.masonryImage1 || data.image) && (
          <Image
            src={data.masonryImages?.masonryImage1?.url || data.image?.url}
            fill
            alt={data.masonryImages?.masonryImage1?.alt || data.image?.alt || 'Imagen de noticia'}
            quality={10}
            sizes="(max-width: 1200px) 20vw, 35vw"
            className="w-full -z-10 object-cover"
          />
        )}

        {isClient && data.videoUrl && (
          <div
            className="relative w-full aspect-[4/3]"
            onMouseEnter={() => setIsPlaying(true)}
            onMouseLeave={() => setIsPlaying(false)}
          >
            <ReactPlayer
              url={getVideoUrl()}
              playing={isPlaying}
              muted={true}
              width="100%"
              height="100%"
              config={{
                youtube: {
                  playerVars: { showinfo: 1 },
                },
              }}
            />
          </div>
        )}
      </div>
      <CardContent className="p-6">
        <CardTitle className="mb-1 line-clamp-1 leading-normal text-xl">{data.title}</CardTitle>
        <CardDescription className="line-clamp-4">{data.summary}</CardDescription>
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
    </Card>
  )
}
