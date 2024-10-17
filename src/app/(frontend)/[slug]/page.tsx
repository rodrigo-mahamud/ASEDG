// app/[slug]/page.tsx
import React from 'react'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'
import Hero from '@/components/hero/Hero'
import RenderBlocks from '@/components/RenderBlocks'
import { Toaster } from 'sonner'
import { notFound } from 'next/navigation'

async function getPageData() {
  const payload = await getPayloadHMR({ config: configPromise })
  const allPagesData = (await payload.find({
    collection: 'pages',
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

export default async function Page({ params }: any) {
  const data = await getPageData()

  const page = data.docs.find((page: any) => page.slug === params.slug)
  if (!page) {
    return notFound()
  }

  return (
    <main>
      <Toaster />
      <Hero data={page} />
      {page.body && <RenderBlocks layout={page.body.layout} />}
    </main>
  )
}

export const revalidate = 60
