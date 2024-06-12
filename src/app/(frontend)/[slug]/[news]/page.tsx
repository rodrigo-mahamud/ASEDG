// app/[slug]/page.tsx
import React from 'react'
import { Metadata } from 'next'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'
import Hero from '@/components/Hero'
import RenderBlocks from '@/components/RenderBlocks'

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
  news: string
}

interface PageProps {
  params: { news: string }
}

// export async function generateStaticParams() {
//   const payload = await getPayloadHMR({ config: configPromise })
//   const pageData = (await payload.find({
//     collection: 'news',
//   })) as any

//   return pageData.docs.map((page: any) => ({
//     slug: page.slug,
//   }))
// }

// export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
//   const payload = await getPayloadHMR({ config: configPromise })
//   const pageData = (await payload.find({
//     collection: 'news',
//   })) as any

//   const page = pageData.docs.find((page: any) => page.slug === params.news)

//   if (!page) {
//     return { title: 'Page not found' }
//   }

//   return {
//     title: page.header.title,
//     description: page.header.description || '',
//   }
// }

export default async function Page({ params }: PageProps) {
  const payload = await getPayloadHMR({ config: configPromise })
  const pageData = (await payload.find({
    collection: 'news',
  })) as any

  const page = pageData.docs.find((page: any) => page.slug === params.news)

  if (!page) {
    return <div>Page not found</div>
  }

  return (
    <main>
      <RenderBlocks layout={page.layout} />
    </main>
  )
}

export const revalidate = 60 // Revalidate every 60 seconds
