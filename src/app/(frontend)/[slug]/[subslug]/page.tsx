// app/[slug]/page.tsx
import React from 'react'
import { Metadata } from 'next'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'
import Hero from '@/components/hero/Hero'
import RenderBlocks from '@/components/RenderBlocks'
import { Toaster } from 'sonner'
import { notFound } from 'next/navigation'
import { NewsItemFull } from '@/types/types'
import NewsHeader from '@/components/news/news-page/NewsHeader'
import Container from '@/components/Container'
import RichTextParser from '@/utils/richTextParser'
import NewsStickyAside from '@/components/news/news-page/NewsStickyAside'
import NewsRelated from '@/components/news/news-page/NewsRelated'

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
  params: { subslug: string }
}

async function getPageData() {
  const payload = await getPayloadHMR({ config: configPromise })
  const data = (await payload.find({
    collection: 'news',
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
      url: `https://${process.env.ROOT_DOMAIN}/${params.subslug}`,
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

  const page = data.docs.find((page: NewsItemFull) => page.subslug === params.subslug)
  if (!page) {
    return notFound()
  }

  const hasAsides = (page: NewsItemFull) => {
    const hasAttachments = page.attachments?.length > 0
    const hasH2Tags =
      page.richtxtcontent?.root?.children?.some((child) => child.tag === 'h2') || false
    return hasAttachments || hasH2Tags
  }
  const shouldShowAside = hasAsides(page)
  return (
    <>
      <NewsHeader data={page} />
      <main>
        <Container className="flex gap-20">
          <article className={`${shouldShowAside ? 'w-[70%]' : 'w-[70%] mx-auto'}`}>
            <RichTextParser content={page.richtxtcontent}></RichTextParser>
          </article>
          {shouldShowAside ? (
            <aside className="w-[30%]">
              <NewsStickyAside attachments={page.attachments} indexContent={page.richtxtcontent} />
            </aside>
          ) : (
            ''
          )}
        </Container>
        <NewsRelated newsRelated={page.newsRelated} />
      </main>
      <Toaster />
    </>
  )
}
export const revalidate = 10
