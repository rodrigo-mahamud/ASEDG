import Container from '@/components/Container'
import { Button } from '@/components/lib/button'
import ShareButton from '@/components/lib/shareButton'
import { Icon360View, IconArrowRight, IconClock24 } from '@tabler/icons-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function ReservationsBlock() {
  return (
    <Container>
      <div className="grid grid-cols-1 gap-6 md:gap-8 xl:grid-cols-2">
        <div className=" group relative rounded-xl btnShadow overflow-hidden h-64">
          <div className="h-full w-full flex flex-col gap-5 sm:flex-row sm:items-center">
            <div className="w-2/5 h-full relative">
              <Image src="/placeholder.jpg" alt="sss" fill className="object-cover"></Image>
            </div>

            <div className=" w-3/5 h-full flex flex-col justify-between py-5 pr-5">
              <h2 className="text-xl font-semibold"> Best western Cedars Hotel</h2>
              <h3 className="text-pretty text-sm line-clamp-3 leading-relaxed">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Commodi architecto eum
                deleniti temporibus suscipit facere animi at dolorum molestias nulla. Labore iusto
                laborum, asperiores et voluptatibus tempore autem eum ducimus.
              </h3>
              <div className="flex w-full gap-8 opacity-75">
                <div className="flex gap-2 items-center font-medium">
                  <IconClock24 stroke={1.5} className="w-5 h-5"></IconClock24>Hola
                </div>
                <div className="flex gap-2 items-center font-medium">
                  <Icon360View stroke={1.5} className="w-5 h-5"></Icon360View>Hola
                </div>
                <div className="flex gap-2 items-center font-medium">
                  <Icon360View stroke={1.5} className="w-5 h-5"></Icon360View>Hola
                </div>
              </div>
              <div className="flex items-center gap-4 h-10">
                <Button
                  asChild
                  variant="expandIcon"
                  iconClass="w-4 h-4"
                  Icon={IconArrowRight}
                  iconPlacement="right"
                  className="flex gap-1 bg-secondaryAlt hover:bg-secondaryAlt/90 rounded-md w-full h-full"
                >
                  <Link href={`noticias-san-esteban-de-gormaz/`}>Ver Más</Link>
                </Button>
                <ShareButton
                  className="w-1/5 h-full outline-none bg-secondaryAlt/5 hover:bg-secondaryAlt/10 flex justify-center items-center rounded-md"
                  url="s"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}
