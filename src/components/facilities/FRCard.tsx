import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function FRCard({ data }: any) {
  return (
    <>
      {data.facilitieImages && (
        <Link
          href={`/instalaciones-deportivas-san-esteban-de-gormaz/${data.slug}`}
          className=" h-64 flex group pr-3"
        >
          <div className="flex relative w-full h-full items-end transitionAlt hover:rounded-xl rounded-lg overflow-hidden">
            <div className="absolute w-full h-full blurMaskAlt z-10"></div>
            <div className="absolute z-10 p-6 flex flex-col items-start w-full translate-y-4 group-hover:translate-y-0 transition-generic">
              <div className="flex justify-between w-full mb-2"></div>
              <div className="w-full">
                <h2 className="text-white line-clamp-2 font-semibold text-lg transition-generic">
                  {data.title}
                </h2>
                <span className="text-white/75 text-xs opacity-0 group-hover:opacity-100 transition-generic">
                  Reservar ahora
                </span>
              </div>
            </div>
            <Image
              src={data.facilitieImages.facilitieImage1.url}
              quality={5}
              sizes="(max-width: 1200px) 10vw, 35vw"
              alt={data.facilitieImages.facilitieImage1.alt}
              width={500}
              height={500}
              className="w-full h-full object-cover group-hover:scale-105 group-hover:brightness-50 transition-generic"
            />
          </div>
        </Link>
      )}
    </>
  )
}
