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

interface PageProps {
  params: { news: string }
}

export default async function Page({ params }: PageProps) {
  const payload = await getPayloadHMR({ config: configPromise })
  const pageData = (await payload.find({
    collection: 'news',
  })) as any

  const page = pageData.docs.find((page: any) => page.slug === params.news)

  if (!page) {
    return <div>Page not found</div>
  }

  // Extraer richtxtcontent del primer elemento del layout
  const richtxtcontent = page.layout[0]?.richtxtcontent || {}

  return (
    <>
      <NewsHeader style={'horizontal'} />
      <main>
        <Container className="flex gap-20">
          <article className="w-4/5">
            <RichTextParser content={richtxtcontent}></RichTextParser>
          </article>
          <aside className="w-1/5">
            <NewsStickyAside></NewsStickyAside>
          </aside>
        </Container>
      </main>
      <Toaster />
    </>
  )
}

export const revalidate = 60 // Revalidate every 60 seconds
