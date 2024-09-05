'use client'
import React from 'react'
import { Badge } from '../lib/badge'
import Container from '../Container'
import { Avatar } from '../lib/avatar'
import { AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import ShareButton from '../lib/shareButton'
import { usePathname } from 'next/navigation'
import { Separator } from '../lib/separator'
import Image from 'next/image'

export default function NewsHeader({ style = 'vertical' }) {
  const pathname = usePathname()

  const getCurrentUrl = () => {
    if (typeof window !== 'undefined') {
      const baseUrl = window.location.origin
      return `${baseUrl}`
    }
    return ''
  }

  const currentUrl = getCurrentUrl()
  return (
    <div className="pt-16">
      {style === 'vertical' && (
        <Container>
          <div className="space-y-5 max-w-screen-md mx-auto">
            <Badge variant={'outline'}>Jewelry</Badge>
            <h1 className="text-5xl font-bold">Trending web & landing page designs in 2023</h1>
            <h2 className="text-lg text-muted-foreground">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perspiciatis tempora
              obcaecati error ipsum voluptatibus sed adipisci ut maiores nesciunt quam.
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
                className="w-9 h-9 outline-none bg-secondaryAlt/5 hover:bg-secondaryAlt/10 flex justify-center items-center rounded-md"
                url={currentUrl}
              />
            </div>
          </div>
          <div className="relative w-full aspect-video overflow-hidden rounded-2xl mt-10">
            <Image
              src="/placeholder.webp"
              fill
              className="mt-10 w-full object-cover scale-125 "
              quality={50}
              sizes="(max-width: 768px) 35vw, (max-width: 1200px) 50vw, 75vw"
              alt="{image.alt}"
            />
          </div>
        </Container>
      )}
    </div>
  )
}
