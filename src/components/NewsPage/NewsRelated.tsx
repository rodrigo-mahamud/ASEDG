import React from 'react'
import Container from '../Container'
import Title from '../lib/title'
import Link from 'next/link'
import Image from 'next/image'
import { NewsRelatedProps, NewsItemBase } from '@/types/typesNP'

export default function NewsRelated({ newsRelated }: NewsRelatedProps) {
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(dateString).toLocaleDateString('es-ES', options)
  }

  return (
    <section className="overflow-hidden bg-[#f3f4f6] border-t border-border">
      <Container className="py-32">
        <div className="flex justify-between w-full">
          <Title
            title={'Más información'}
            subtitle={
              'Recopilación de otras noticias sobre la localidad y su comarca que te pueden interesar'
            }
          />
        </div>
        <div className="flex gap-8">
          {newsRelated.map((newsItem: NewsItemBase) => (
            <div
              key={newsItem.id}
              className="relative w-1/4 mainShadow transitionAlt hover:rounded-xl group rounded-lg overflow-hidden"
            >
              <div className="bg-white/25 absolute backdrop-blur-md z-20 m-6 rounded-full opacity-0 group-hover:opacity-100 transition-generic">
                {newsItem.categories && newsItem.categories.length > 0 && (
                  <p className="text-white px-4 my-1 text-xs leading-normal">
                    {newsItem.categories[0].title}
                  </p>
                )}
              </div>
              <Link href={`/noticias-san-esteban-de-gormaz/${newsItem.slug}`}>
                <div className="flex relative w-full h-[27rem] items-end">
                  <div className="absolute w-full h-full blurMaskAlt z-10"></div>
                  <div className="absolute z-10 p-6 flex flex-col items-start w-full translate-y-4 group-hover:translate-y-0 transition-generic">
                    <div className="flex justify-between w-full mb-2"></div>
                    <div className="w-full">
                      <h2 className="text-white line-clamp-2 font-bold text-xl transition-generic">
                        {newsItem.summary}
                      </h2>
                      <span className="text-white/75 text-xs opacity-0 group-hover:opacity-100 transition-generic">
                        {formatDate(newsItem.publishedDate)}
                      </span>
                    </div>
                  </div>
                  <Image
                    src={newsItem.image.url}
                    quality={5}
                    sizes="(max-width: 1200px) 20vw, 35vw"
                    alt={newsItem.title}
                    width={500}
                    height={500}
                    className="w-full h-full object-cover group-hover:scale-105 group-hover:brightness-50 transition-generic"
                  />
                </div>
              </Link>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
