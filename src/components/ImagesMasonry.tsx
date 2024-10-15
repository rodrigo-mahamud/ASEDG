import Image from 'next/image'
import React from 'react'

interface ImagesMasonryProps {
  imageSrcs: string[]
  imageAlts: string[]
}

export default function ImagesMasonry({ imageSrcs, imageAlts }: ImagesMasonryProps) {
  return (
    <div className="grid grid-cols-4 grid-rows-4 gap-2 h-[35rem]">
      <div className="col-span-2 row-span-4 relative overflow-hidden rounded-xl">
        <Image
          src={imageSrcs[0]}
          fill
          className="w-full object-cover"
          quality={15}
          sizes="(max-width: 768px) 15vw, (max-width: 1200px) 35vw, 50vw"
          alt={imageAlts[0]}
        />
      </div>
      <div className="row-span-2 col-start-3 relative h-full overflow-hidden rounded-xl">
        <Image
          src={imageSrcs[1]}
          fill
          className="w-full object-cover"
          quality={15}
          sizes="(max-width: 768px) 15vw, (max-width: 1200px) 35vw, 50vw"
          alt={imageAlts[1]}
        />
      </div>
      <div className="row-span-2 col-start-3 row-start-3 relative h-full overflow-hidden rounded-xl">
        <Image
          src={imageSrcs[2]}
          fill
          className="w-full object-cover"
          quality={15}
          sizes="(max-width: 768px) 15vw, (max-width: 1200px) 35vw, 50vw"
          alt={imageAlts[2]}
        />
      </div>
      <div className="row-span-2 col-start-4 row-start-1 relative h-full overflow-hidden rounded-xl">
        <Image
          src={imageSrcs[3]}
          fill
          className="w-full object-cover"
          quality={15}
          sizes="(max-width: 768px) 15vw, (max-width: 1200px) 35vw, 50vw"
          alt={imageAlts[3]}
        />
      </div>
      <div className="row-span-2 col-start-4 row-start-3 relative h-full overflow-hidden rounded-xl">
        <Image
          src={imageSrcs[4]}
          fill
          className="w-full object-cover"
          quality={15}
          sizes="(max-width: 768px) 15vw, (max-width: 1200px) 35vw, 50vw"
          alt={imageAlts[4]}
        />
      </div>
    </div>
  )
}
