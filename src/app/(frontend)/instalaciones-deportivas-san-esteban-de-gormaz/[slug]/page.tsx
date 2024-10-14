import React from 'react'
import { notFound } from 'next/navigation'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'
import { Toaster } from 'sonner'
import ImagesMasonry from '@/components/ImagesMasonry'
import Container from '@/components/Container'
import { Facility } from '@/payload-types'
import FacilitieInfo from '@/components/facilities/FacilitieInfo'
import BookingSticky from '@/components/BookingSticky'
import FacilitieLocationMap from '@/components/facilities/FacilitieLocationMap'
import { Separator } from '@/components/lib/separator'

type PageProps = {
  params: { slug: string }
}
async function getPageData() {
  const payload = await getPayloadHMR({ config: configPromise })
  const singleNewsPage = (await payload.find({
    collection: 'facilities',
  })) as any
  return singleNewsPage
}
async function getSettings() {
  const payload = await getPayloadHMR({ config: configPromise })
  const settings = (await payload.findGlobal({
    slug: 'settings',
  })) as any
  return settings
}
export async function generateMetadata() {
  const data = await getPageData()
  const seoData = data.meta || ({} as any)
  const settings = await getSettings()

  return {
    title: seoData.title || settings.defaultTitle || ' ',
    description: seoData.description,
    icons: {
      icon: [
        {
          url: settings.faviconLight ? settings.faviconLight.url : '/faviconPlaceholder.png',
          media: '(prefers-color-scheme: light)',
        },
        {
          url: settings.faviconDark ? settings.faviconDark.url : '/faviconPlaceholder.png',
          media: '(prefers-color-scheme: dark)',
        },
      ],
    },
    openGraph: {
      locale: 'es_ES',
      title: seoData.title || settings.defaultTitle || ' ',
      siteName: settings.defaultTitle,
      url: `https://${process.env.ROOT_DOMAIN}/instalaciones-deportivas-san-esteban-de-gormaz`,
      description: seoData.description || settings.defaultDescription,
      images: seoData?.image?.url || settings.defaultOgImage,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      domain: process.env.ROOT_DOMAIN,
      title: seoData.title || settings.defaultTitle,
      description: seoData.description || settings.defaultDescription,
      images: seoData?.image?.url || settings.defaultOgImage,
    },
  }
}
export default async function BookingPage({ params }: PageProps) {
  const data = await getPageData()

  const page = data.docs.find((page: Facility) => page.slug === params.slug)
  if (!page) {
    return notFound()
  }

  const imageSrcs = [
    '/placeholder.jpg',
    '/placeholder.jpg',
    '/placeholder.jpg',
    '/placeholder.jpg',
    '/placeholder.jpg',
  ]

  const imageAlts = [
    '/placeholder.jpg',
    '/placeholder.jpg',
    '/placeholder.jpg',
    '/placeholder.jpg',
    '/placeholder.jpg',
  ]

  return (
    <main>
      <Toaster />
      <Container>
        <ImagesMasonry imageSrcs={imageSrcs} imageAlts={imageAlts} />
        <div className="w-full flex gap-24 relative my-12">
          <FacilitieInfo data={page}></FacilitieInfo>
          <BookingSticky data={page.bookingOptions}></BookingSticky>
        </div>
        <Separator></Separator>
        <FacilitieLocationMap></FacilitieLocationMap>
      </Container>
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
