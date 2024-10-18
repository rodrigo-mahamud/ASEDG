import Image from 'next/image'
import React from 'react'
import imahe from 'public/placeholder.jpg'
interface ImagesMasonryProps {
  imageSrcs: string[]
  imageAlts: string[]
  thumbnailSrcs: string[]
}

export default function ImagesMasonry({ imageSrcs, imageAlts, thumbnailSrcs }: ImagesMasonryProps) {
  return (
    <div className="grid grid-cols-4 grid-rows-4 gap-2 h-[35rem]">
      <div className="col-span-2 row-span-4 relative overflow-hidden rounded-l-xl">
        <Image
          src={imageSrcs[0]}
          fill
          placeholder="blur"
          blurDataURL={thumbnailSrcs[0]}
          className="w-full object-cover"
          quality={50}
          sizes="(max-width: 768px) 85vw, (max-width: 1200px) 50vw, 35vw"
          alt={imageAlts[0]}
        />
      </div>
      <div className="row-span-2 col-start-3 relative h-full overflow-hidden ">
        <Image
          src={imageSrcs[1]}
          fill
          placeholder="blur"
          blurDataURL={thumbnailSrcs[1]}
          className="w-full object-cover"
          quality={15}
          sizes="(max-width: 768px) 85vw, (max-width: 1200px) 50vw, 35vw"
          alt={imageAlts[1]}
        />
      </div>
      <div className="row-span-2 col-start-3 row-start-3 relative h-full overflow-hidden ">
        <Image
          src={imageSrcs[2]}
          fill
          placeholder="blur"
          blurDataURL={thumbnailSrcs[2]}
          className="w-full object-cover"
          quality={15}
          sizes="(max-width: 768px) 85vw, (max-width: 1200px) 50vw, 35vw"
          alt={imageAlts[2]}
        />
      </div>
      <div className="row-span-2 col-start-4 row-start-1 relative h-full overflow-hidden rounded-tr-xl">
        <Image
          src={imageSrcs[3]}
          fill
          placeholder="blur"
          blurDataURL={thumbnailSrcs[3]}
          className="w-full object-cover"
          quality={15}
          sizes="(max-width: 768px) 85vw, (max-width: 1200px) 50vw, 35vw"
          alt={imageAlts[3]}
        />
      </div>
      <div className="row-span-2 col-start-4 row-start-3 relative h-full overflow-hidden rounded-br-xl">
        <Image
          src={imageSrcs[4]}
          fill
          placeholder="blur"
          blurDataURL={thumbnailSrcs[4]}
          className="w-full object-cover"
          quality={15}
          sizes="(max-width: 768px) 85vw, (max-width: 1200px) 50vw, 35vw"
          alt={imageAlts[4]}
        />
      </div>
    </div>
  )
}
