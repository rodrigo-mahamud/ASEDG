import Container from '@/components/Container'
import Image from 'next/image'
import React from 'react'

export default function ReservationsBlock() {
  return (
    <Container>
      <div className="grid grid-cols-1 gap-6 md:gap-8 xl:grid-cols-2 ">
        <div className=" group relative bg-white border-neutral-200/80 rounded-xl overflow-hidden ">
          <div className="h-full w-full flex flex-col sm:flex-row sm:items-center">
            <div className="w-2/5">
              <Image src="/placeholder.jpg" alt="sss" width={550} height={500}></Image>
            </div>
            <div className="w-3/5">rRjr</div>
          </div>
        </div>
      </div>
    </Container>
  )
}
