// app/[slug]/page.tsx
import React from 'react'
import { Metadata } from 'next'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'
import Hero from '@/components/hero/Hero'
import RenderBlocks from '@/components/RenderBlocks'
import { Toaster } from 'sonner'
import { notFound } from 'next/navigation'

interface PageProps {
  params: { slug: string }
}

async function getPageBySlug(slug: string) {
  const payload = await getPayloadHMR({ config: configPromise })
  const page = await payload.find({
    collection: 'pages',
    where: {
      slug: {
        equals: slug,
      },
    },
  })
  return page.docs[0]
}

async function getAllPageSlugs() {
  const payload = await getPayloadHMR({ config: configPromise })
  const pages = await payload.find({
    collection: 'pages',
    limit: 1000,
    where: {
      slug: {
        not_equals: null,
      },
    },
  })
  return pages.docs.map((page: any) => page.slug)
}

async function getSettings() {
  const payload = await getPayloadHMR({ config: configPromise })
  return await payload.findGlobal({ slug: 'settings' })
}

export async function generateStaticParams() {
  const slugs = await getAllPageSlugs()
  return slugs.map((slug: string) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps) {
  const page = await getPageBySlug(params.slug)
  const settings = (await getSettings()) as any
  const seoData = page?.meta || ({} as any)

  return {
    title: seoData.title || settings.defaultTitle,
    description: seoData.description || settings.defaultDescription,
    icons: {
      icon: [
        { url: settings.faviconLight?.url || ' ', media: '(prefers-color-scheme: light)' },
        { url: settings.faviconDark?.url || ' ', media: '(prefers-color-scheme: dark)' },
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
  const page = await getPageBySlug(params.slug)

  if (!page) {
    return notFound()
  }

  return (
    <main>
      <Hero data={page} />
      {page.body && <RenderBlocks layout={page.body.layout} />}
      <Toaster />
    </main>
  )
}

export const revalidate = 60
