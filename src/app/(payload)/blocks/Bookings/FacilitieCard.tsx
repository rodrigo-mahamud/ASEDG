import { Button } from '@/components/lib/button'
import ShareButton from '@/components/lib/shareButton'
import { IconArrowRight, IconClock, IconTag } from '@tabler/icons-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { getPriceRange, getOpenHours } from '@/utils/facilitiesHelper'

export default function FacilitieCard({ data }: any) {
  return (
    <div className="group relative rounded-xl btnShadow overflow-hidden h-full">
      <div className="h-full w-full flex flex-col gap-5 sm:flex-row sm:items-center">
        <div className="w-2/5 h-full relative">
          <Image
            src={data.facilitieImages.facilitieImage1.url}
            alt={data.facilitieImages.facilitieImage1.alt}
            fill
            className="object-cover"
          ></Image>
        </div>

        <div className="w-3/5 h-full flex flex-col justify-between py-5 pr-5 gap-4">
          <h2 className="text-xl font-semibold leading-none">{data.title}</h2>
          <h3 className="text-pretty text-sm line-clamp-3 ">{data.description}</h3>
          <div className="flex flex-col w-full gap-2">
            <div className="flex gap-1 items-center">
              <IconClock stroke={1.5} className="w-4 h-4"></IconClock>
              <span className="text-sm"> Abierto:</span>

              <span className="text-sm font-medium">
                {getOpenHours(data.regularSchedule.schedule)}
              </span>
            </div>
            <div className="flex gap-1 items-center">
              <IconTag stroke={1.5} className="w-4 h-4"></IconTag>
              <span className="text-sm"> Desde:</span>

              <span className="text-sm font-medium">{getPriceRange(data.bookingOptions)}</span>
            </div>
          </div>

          <div className="flex items-center gap-4 h-10">
            <Button
              asChild
              variant="expandIcon"
              iconClass="w-5 h-5"
              Icon={IconArrowRight}
              iconPlacement="right"
              className="flex gap-1 bg-secondaryAlt hover:bg-secondaryAlt/90 rounded-md w-full h-full"
            >
              <Link href={`instalaciones-deportivas-san-esteban-de-gormaz/${data.slug}`}>
                Reservar
              </Link>
            </Button>
            <ShareButton
              className="w-1/5 h-full outline-none bg-secondary border-border border hover:bg-secondaryAlt/5 flex justify-center items-center rounded-md"
              url={`instalaciones-deportivas-san-esteban-de-gormaz/${data.slug}`}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
