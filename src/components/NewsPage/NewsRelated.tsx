import React from 'react'
import Container from '../Container'
import Title from '../lib/title'
import Link from 'next/link'
import { Button } from '../lib/button'
import { NewsItemData } from '@/types/typesNP'
import Image from 'next/image'

export default function NewsRelated({ newsRelated }: { newsRelated: NewsItemData[] }) {
  console.log(newsRelated)

  return (
    <section className=" overflow-hidden">
      <Container className="py-32">
        <div className="flex justify-between w-full">
          <Title title={'Te puede interesar'} subtitle={'Prueba'} />
        </div>
        <div className=" flex gap-8">
          {newsRelated.map((newsItem) => (
            <div
              key={newsItem.id}
              className="relative mainShadow transitionAlt hover:rounded-2xl group rounded-lg overflow-hidden"
            >
              <Link href={`/noticias-san-esteban-de-gormaz/${newsItem.slug}`}>
                <div className="flex relative w-full h-[25rem] items-end">
                  <div className="absolute w-full h-full blurMaskAlt z-10"></div>
                  <div className="absolute z-10 p-6 flex items-center w-full translate-y-24 group-hover:translate-y-0 transition-transform">
                    <div className="w-full ">
                      <h2 className="text-white line-clamp-2 font-bold  text-xl transition-transform">
                        {newsItem.summary}
                      </h2>
                      <h2 className="text-white/75 line-clamp-3 opacity-0 group-hover:opacity-100 transition-transform">
                        {newsItem.summary}
                      </h2>
                    </div>
                  </div>

                  <Image
                    src={newsItem.image.url}
                    quality={5}
                    sizes="(max-width: 1200px) 20vw, 35vw"
                    alt={newsItem.title}
                    width={500}
                    height={500}
                    className="w-full h-full object-cover group-hover:scale-105 group-hover:brightness-90 transition-transform"
                  ></Image>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
