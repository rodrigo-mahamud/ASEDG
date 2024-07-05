import React from 'react'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { Toaster } from 'sonner'
import ImagesMasonry from '@/components/ImagesMasonry'
import BookingSection from '@/components/BookingSection'

type PageProps = {
  params: { slug: string }
}

export default async function BookingPage({ params }: PageProps) {
  const payload = await getPayload({ config: configPromise })

  const facilitiesData = (await payload.find({
    collection: 'facilities',
  })) as any

  const data = facilitiesData.docs.find((booking: any) => booking.slug === params.slug)

  if (!data) {
    notFound()
  }

  return (
    <main>
      <ImagesMasonry></ImagesMasonry>
      <BookingSection data={data}></BookingSection>
      <Toaster />
    </main>
  )
}

// // Configura la regeneración estática incremental
// export const revalidate = 60 // Revalidate every 60 seconds

// export async function generateStaticParams() {
//   const payload = await getPayload({ config: configPromise })

//   const bookings = (await payload.find({
//     collection: 'bookings',
//   })) as any

//   return bookings.docs.map((booking: any) => ({
//     slug: booking.slug,
//   }))
// }
