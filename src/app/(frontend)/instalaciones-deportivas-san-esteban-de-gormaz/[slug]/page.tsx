import React from 'react'
import { notFound } from 'next/navigation'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'
import { Toaster } from 'sonner'
import ImagesMasonry from '@/components/ImagesMasonry'
import Container from '@/components/Container'
import { Facility } from '@/payload-types'
import FacilitieInfo from '@/components/facilities/FacilitieInfo'
import FacilitieLocationMap from '@/components/facilities/FacilitieLocationMap'
import { Separator } from '@/components/lib/separator'
import FacilitiesBarMobile from '@/components/facilities/FacilitiesBarMobile'

type PageProps = {
  params: Promise<{ slug: string }>
}

async function getPageData() {
  const payload = await getPayloadHMR({ config: configPromise })
  const allPagesData = (await payload.find({
    collection: 'facilities',
    draft: false,
  })) as any
  return allPagesData
}
export async function generateStaticParams() {
  const allPages = await getPageData()
  return allPages.docs.map((page: any) => ({
    slug: page.slug,
  }))
}
async function getSettings() {
  const payload = await getPayloadHMR({ config: configPromise })
  const settings = (await payload.findGlobal({
    slug: 'settings',
  })) as any
  return settings
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const data = await getPageData()
  const page = data.docs.find((page: Facility) => page.slug === slug)
  const seoData = page?.meta || ({} as any)
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
  const { slug } = await params
  const data = await getPageData()

  const page = data.docs.find((page: Facility) => page.slug === slug)
  if (!page) {
    return notFound()
  }
  const images = Object.values(page.facilitieImages).filter((img) => img !== null)
  const imageSrcs = images.map((img: any) => img.url)
  const thumbnailSrcs = images.map((img: any) => img.sizes.thumbnail.url)
  const imageAlts = images.map((img: any) => img.alt || 'Imagen de la instalación')

  return (
    <main>
      <Toaster />
      <FacilitiesBarMobile data={page}></FacilitiesBarMobile>
      {images.length > 0 && (
        <ImagesMasonry imageSrcs={imageSrcs} imageAlts={imageAlts} thumbnailSrcs={thumbnailSrcs} />
      )}
      <Container className="md:pt-0">
        <FacilitieInfo data={page}></FacilitieInfo>
        <div className="pt-4 pb-8 md:pt-16 md:pb-14">
          <Separator></Separator>
        </div>
        <FacilitieLocationMap address={page.location}></FacilitieLocationMap>
      </Container>
    </main>
  )
}

export const revalidate = 60
