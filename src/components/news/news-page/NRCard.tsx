import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

import { cn } from '@/utils/utils'
import { NewsCardProps, NewsItemBase } from '@/types/types'

export default function NRCard({ data, className }: NewsCardProps) {
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(dateString).toLocaleDateString('es-ES', options)
  }

  const imageUrl =
    data.masonryImages?.masonryImage1?.url || data.image?.url || '/placeholder-image.jpg'
  const imageAlt =
    data.masonryImages?.masonryImage1?.alt || data.image?.alt || data.title || 'News image'

  return (
    <div
      className={cn(
        'relative w-1/4 h-[27rem] mainShadow transitionAlt hover:rounded-xl group rounded-lg overflow-hidden',
        className,
      )}
    >
      <div className="bg-white/25 absolute backdrop-blur-md z-20 m-6 rounded-full opacity-0 group-hover:opacity-100 transition-generic">
        {data.categories && data.categories.length > 0 && (
          <p className="text-white px-4 my-1 text-xs leading-normal">{data.categories[0].title}</p>
        )}
      </div>
      <Link href={`/noticias-san-esteban-de-gormaz/${data.slug}`}>
        <div className="flex relative w-full h-full items-end">
          <div className="absolute w-full h-full blurMaskAlt z-10"></div>
          <div className="absolute z-10 p-6 flex flex-col items-start w-full translate-y-4 group-hover:translate-y-0 transition-generic">
            <div className="flex justify-between w-full mb-2"></div>
            <div className="w-full">
              <h2 className="text-white line-clamp-2 font-bold text-xl transition-generic">
                {data.summary}
              </h2>
              <span className="text-white/75 text-xs opacity-0 group-hover:opacity-100 transition-generic">
                {formatDate(data.publishedDate)}
              </span>
            </div>
          </div>
          <Image
            src={imageUrl}
            quality={5}
            sizes="(max-width: 1200px) 10vw, 35vw"
            alt={imageAlt}
            width={500}
            height={500}
            className="w-full h-full object-cover group-hover:scale-105 group-hover:brightness-50 transition-generic"
          />
        </div>
      </Link>
    </div>
  )
}
