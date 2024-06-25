import React from 'react'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'
import { Toaster } from 'sonner'

type PageProps = {
  params: { slug: string }
}

export default async function BookingPage({ params }: PageProps) {
  const payload = await getPayloadHMR({ config: configPromise })

  const bookingsData = (await payload.find({
    collection: 'bookings',
  })) as any

  const booking = bookingsData.docs.find((booking: any) => booking.slug === params.slug)

  if (!booking) {
    notFound()
  }
  console.log(payload)

  return (
    <main>
      <h1>{booking.title}</h1>

      <Toaster />
    </main>
  )
}

// // Configura la regeneración estática incremental
// export const revalidate = 60 // Revalidate every 60 seconds

// export async function generateStaticParams() {
//   const payload = await getPayloadHMR({ config: configPromise })

//   const bookings = (await payload.find({
//     collection: 'bookings',
//   })) as any

//   return bookings.docs.map((booking: any) => ({
//     slug: booking.slug,
//   }))
// }
