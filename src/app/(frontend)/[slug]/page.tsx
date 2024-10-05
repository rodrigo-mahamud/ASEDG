// app/[slug]/page.tsx
import React from 'react'
import { Metadata } from 'next'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'
import Hero from '@/components/hero/Hero'
import RenderBlocks from '@/components/RenderBlocks'
import { Toaster } from 'sonner'
import { notFound } from 'next/navigation'

interface Page {
  id: number
  header: {
    style: string
    titleIndex: string | null
    pretitleIndex: string | null
    description: string | null
    newsSelection: number[]
    title: string
    pretitle: string | null
  }
  slug: string
}

interface PageProps {
  params: { slug: string }
}

async function getPageData() {
  const payload = await getPayloadHMR({ config: configPromise })
  const data = (await payload.find({
    collection: 'pages',
  })) as any
  return data
}

async function getSettings() {
  const payload = await getPayloadHMR({ config: configPromise })
  const settings = (await payload.findGlobal({
    slug: 'settings',
  })) as any

  return settings
}

export async function generateStaticParams() {
  const data = await getPageData()
  return data.docs.map((page: any) => ({
    slug: page.slug,
  }))
}

export async function generateMetadata({ params }: PageProps) {
  const data = await getPageData()
  const seoData = data.meta || ({} as any)
  const settings = await getSettings()

  return {
    title: seoData.title || settings.defaultTitle,
    description: seoData.description || settings.defaultDescription,
    icons: {
      icon: [
        {
          url: settings.faviconLight.url || ' ',
          media: '(prefers-color-scheme: light)',
        },
        {
          url: settings.faviconDark.url || ' ',
          media: '(prefers-color-scheme: dark)',
        },
      ],
    },
    openGraph: {
      locale: 'es_ES',
      title: seoData.title || settings.defaultTitle || ' ',
      siteName: settings.defaultTitle,
      url: `https://${process.env.ROOT_DOMAIN}/${params.slug}`,
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
export default async function Page({ params }: PageProps) {
  const data = await getPageData()
  const page = data.docs.find((page: any) => page.slug === params.slug)

  if (!page) {
    return notFound()
  }

  return (
    <main>
      <Hero data={page} />
      <RenderBlocks layout={page.body.layout} />
      <Toaster />
    </main>
  )
}

export const revalidate = 10
