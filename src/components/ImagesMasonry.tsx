import Image from 'next/image'
import React from 'react'
import Container from './Container'

export default function ImagesMasonry() {
  return (
    <Container className="pb-0">
      <div className="grid grid-cols-4 grid-rows-4 gap-3">
        <div className="col-span-2 row-span-4 relative overflow-hidden rounded-lg">
          <Image src="/placeholder.jpg" alt="sss" className="object-cover" fill></Image>
        </div>
        <div className="row-span-2 col-start-3 relative aspect-[4/3] overflow-hidden rounded-lg">
          <Image src="/placeholder.jpg" alt="sss" className="object-cover" fill></Image>
        </div>
        <div className="row-span-2 col-start-3 row-start-3 relative aspect-[4/3] overflow-hidden rounded-lg">
          <Image src="/placeholder.jpg" alt="sss" className="object-cover" fill></Image>
        </div>
        <div className="row-span-2 col-start-4 row-start-1 relative aspect-[4/3] overflow-hidden rounded-lg">
          <Image src="/placeholder.jpg" alt="sss" className="object-cover" fill></Image>
        </div>
        <div className="row-span-2 col-start-4 row-start-3 relative aspect-[4/3] overflow-hidden rounded-lg">
          <Image src="/placeholder.jpg" alt="sss" className="object-cover" fill></Image>
        </div>
      </div>
    </Container>
  )
}
