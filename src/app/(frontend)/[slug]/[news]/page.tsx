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

const Page: React.FC<NewsPageProps> = async ({ params }) => {
  const payload = await getPayloadHMR({ config: configPromise })
  const pageData = (await payload.find({
    collection: 'news',
  })) as NewsPageData

  const page = pageData.docs.find((page: NewsPage) => page.slug === params.news)
  // console.log(page)

  if (!page) {
    return <div>Page not found</div>
  }

  return (
    <>
      <NewsHeader style={'horizontal'} />
      <main>
        <Container className="flex gap-20">
          <article className="w-4/6">
            <RichTextParser content={page.richtxtcontent}></RichTextParser>
          </article>
          <aside className="w-2/6">
            <NewsStickyAside
              attachments={page.attachments}
              indexContent={page.richtxtcontent}
            ></NewsStickyAside>
          </aside>
        </Container>
      </main>
      <Toaster />
    </>
  )
}

export default Page

export const revalidate = 60 // Revalidate every 60 seconds
