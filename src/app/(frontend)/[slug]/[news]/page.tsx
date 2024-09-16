import React from 'react'
import { Metadata } from 'next'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'
import NewsHeader from '@/components/NewsPage/NewsHeader'
import RichText from '@/app/(payload)/blocks/RichText/Component'
import { Toaster } from 'sonner'
import NewsStickyAside from '@/components/NewsPage/NewsStickyAside'
import RichTextParser from '@/utils/richTextParser'
import Container from '@/components/Container'
import { NewsPageProps, NewsPage, NewsPageData } from '@/types/typesNP'
import NewsRelated from '@/components/NewsPage/NewsRelated'

const Page: React.FC<NewsPageProps> = async ({ params }) => {
  const payload = await getPayloadHMR({ config: configPromise })
  const pageData = (await payload.find({
    collection: 'news',
  })) as NewsPageData

  const page = pageData.docs.find((page: NewsPage) => page.slug === params.news)

  if (!page) {
    return <div>Page not found</div>
  }

  return (
    <>
      <NewsHeader style={'masonry'} />
      <main>
        <Container className="flex gap-20">
          <article className="w-[70%]">
            <RichTextParser content={page.richtxtcontent}></RichTextParser>
          </article>
          <aside className="w-[30%]">
            <NewsStickyAside
              attachments={page.attachments}
              indexContent={page.richtxtcontent}
            ></NewsStickyAside>
          </aside>
        </Container>
        <NewsRelated newsRelated={page.newsRelated}></NewsRelated>
      </main>
      <Toaster />
    </>
  )
}

export default Page

export const revalidate = 60 // Revalidate every 60 seconds
