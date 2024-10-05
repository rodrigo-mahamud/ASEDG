import React from 'react'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'
import NewsHeader from '@/components/news/news-page/NewsHeader'
import RichTextParser from '@/utils/richTextParser'
import Container from '@/components/Container'
import NewsRelated from '@/components/news/news-page/NewsRelated'
import NewsStickyAside from '@/components/news/news-page/NewsStickyAside'
import { Toaster } from 'sonner'
import { NewsPageProps, NewsPageData, NewsItemFull } from '@/types/types'
import { notFound } from 'next/navigation'

async function getPageData() {
  const payload = await getPayloadHMR({ config: configPromise })
  const singleNewsPage = (await payload.find({
    collection: 'news',
  })) as NewsPageData
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
      url: `https://${process.env.ROOT_DOMAIN}/noticias-san-esteban-de-gormaz`,
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
export default async function singleNewPage({ params }: NewsPageProps) {
  const data = await getPageData()

  const page = data.docs.find((page: NewsItemFull) => page.slug === params.news)
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

export const revalidate = 60 // Revalidate every 60 seconds
