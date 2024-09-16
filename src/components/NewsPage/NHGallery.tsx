import React from 'react'
import ImagesMasonry from '../ImagesMasonry'
import { Separator } from '../lib/separator'
import { Badge } from '../lib/badge'
import Container from '../Container'
import { Avatar, AvatarFallback, AvatarImage } from '../lib/avatar'
import ShareButton from '../lib/shareButton'

export default function NHGallery({ currentUrl }: any) {
  return (
    <>
      <Container className="pb-0">
        <div className="space-y-5 mx-auto pb-10">
          <Badge variant={'outline'}>Jewelry</Badge>
          <div className="max-w-3xl mr-auto">
            <h1 className="text-5xl font-bold mb-4">Trending web & landing page designs in 2023</h1>
            <h2 className="text-lg text-muted-foreground">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perspiciatis tempora
              obcaecati error ipsum voluptatibus sed adipisci ut maiores nesciunt quam.
            </h2>
          </div>
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
        <ImagesMasonry></ImagesMasonry>
      </Container>
    </>
  )
}
