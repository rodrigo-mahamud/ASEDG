import Image from 'next/image'
import Container from '../Container'
import { Avatar, AvatarFallback, AvatarImage } from '../lib/avatar'
import { Badge } from '../lib/badge'
import { Separator } from '../lib/separator'
import ShareButton from '../lib/shareButton'
import React from 'react'

export default function NHHorizontal({ currentUrl }: any) {
  return (
    <header className="w-full bg-[#111827] overflow-hidden h-[35rem] relative">
      <Container className="py-28 flex h-full">
        <div className="space-y-5 w-4/6">
          <Badge variant={'outline'} className="bg-rose-100 text-rose-800 border-0">
            Jewelry Hpo
          </Badge>
          <h1 className="text-5xl font-bold  text-white">
            Trending web & landing page designs in 2023
          </h1>
          <h2 className="text-lg text-muted-foreground">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perspiciatis tempora obcaecati
            error ipsum voluptatibus sed adipisci ut maiores nesciunt quam.
          </h2>
          <Separator className="opacity-15"></Separator>
          <div className="flex w-full justify-between">
            <div className="flex">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="flex flex-col ml-3 ">
                <span className="text-sm text-white">Foulcher Nathanil</span>
                <span className="text-xs text-muted-foreground">May 20, 2021 · 2 min read</span>
              </div>
            </div>

            <ShareButton
              iconStroke="1.5"
              className="w-9 h-9 outline-none bg-secondaryAlt/5 hover:bg-secondaryAlt/10 flex justify-center items-center rounded-full"
              url={currentUrl}
            />
          </div>
        </div>
      </Container>
      <div className="h-[inherit] mt-8 md:mt-0 md:absolute md:top-0 md:right-0 md:bottom-0 md:w-1/2 lg:w-2/5 2xl:w-1/3">
        <div className="hidden md:block absolute top-0 left-0 bottom-0 w-1/5 from-[#111827] dark:from-black bg-gradient-to-r z-10"></div>
        <Image
          src="/placeholder.webp"
          width={500}
          height={800}
          className="block w-full h-full object-cover opacity-85"
          quality={50}
          sizes="(max-width: 768px) 35vw, (max-width: 1200px) 50vw, 75vw"
          alt="{image.alt}"
        />
      </div>
    </header>
  )
}
