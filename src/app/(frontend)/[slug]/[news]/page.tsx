import React from 'react'
import { Metadata } from 'next'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'
import NewsHeader from '@/components/NewsPage/NewsHeader'
import RichTextParser from '@/utils/richTextParser'
import Container from '@/components/Container'
import NewsRelated from '@/components/NewsPage/NewsRelated'
import NewsStickyAside from '@/components/NewsPage/NewsStickyAside'
import { Toaster } from 'sonner'
import { NewsPageProps, NewsPageData, NewsItemFull } from '@/types/typesNP'

const Page: React.FC<NewsPageProps> = async ({ params }) => {
  const payload = await getPayloadHMR({ config: configPromise })

  const pageData = (await payload.find({
    collection: 'news',
  })) as NewsPageData
  const settings = (await payload.findGlobal({ slug: 'settings' })) as any

  const page = pageData.docs.find((page: NewsItemFull) => page.slug === params.news)
  if (!page) {
    return <div>Page not found</div>
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
      <NewsHeader data={page} newsPageSlug={settings.newsPage.slug} />
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

export default Page

export const revalidate = 60 // Revalidate every 60 seconds
