import Image from 'next/image'
import Container from '../Container'
import { Avatar, AvatarFallback, AvatarImage } from '../lib/avatar'
import { Badge } from '../lib/badge'
import { Separator } from '../lib/separator'
import ShareButton from '../lib/shareButton'
import React from 'react'

export default function NHVertical({ currentUrl }: any) {
  return (
    <Container className="pb-10">
      <div className="space-y-5 max-w-screen-md mx-auto">
        <Badge variant={'outline'}>Jewelry</Badge>
        <h1 className="text-5xl font-bold">Trending web & landing page designs in 2023</h1>
        <h2 className="text-lg text-muted-foreground">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perspiciatis tempora obcaecati
          error ipsum voluptatibus sed adipisci ut maiores nesciunt quam.
        </h2>
        <Separator></Separator>
        <div className="flex w-full justify-between">
          <div className="flex">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex flex-col ml-3">
              <span className="text-sm">Foulcher Nathanil</span>
              <span className="text-xs">May 20, 2021 · 2 min read</span>
            </div>
          </div>

          <ShareButton
            iconStroke="1.5"
            className="w-9 h-9 outline-none bg-secondaryAlt/5 hover:bg-secondaryAlt/10 flex justify-center items-center rounded-full"
            url={currentUrl}
          />
        </div>
      </div>
      <div className="relative w-full aspect-video overflow-hidden rounded-2xl mt-10">
        <Image
          src="/placeholder.webp"
          fill
          className=" w-full object-cover "
          quality={50}
          sizes="(max-width: 768px) 35vw, (max-width: 1200px) 50vw, 75vw"
          alt="{image.alt}"
        />
      </div>
    </Container>
  )
}
