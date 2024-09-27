import React from 'react'
import { Metadata } from 'next'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'
import Hero from '@/components/hero/Hero'
import RenderBlocks from '@/components/RenderBlocks'
import { Toaster } from 'sonner'

interface PageProps {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateStaticParams() {
  const payload = await getPayloadHMR({ config: configPromise })
  const pageData = await payload.find({
    collection: 'pages',
  })

  return pageData.docs.map((page: any) => ({
    slug: page.slug,
  }))
}

export async function generateMetadata({ params, searchParams }: PageProps): Promise<Metadata> {
  const payload = await getPayloadHMR({ config: configPromise })
  let page

  if (searchParams.payload_json) {
    page = JSON.parse(searchParams.payload_json as string)
  } else {
    page = await payload.findByID({
      collection: 'pages',
      id: params.slug,
    })
  }

  if (!page) {
    return { title: 'Page not found' }
  }

  return {
    title: page.header.title,
    description: page.header.description || '',
  }
}

export default async function Page({ params, searchParams }: PageProps) {
  const payload = await getPayloadHMR({ config: configPromise })
  let pageData

  if (searchParams.payload_json) {
    pageData = JSON.parse(searchParams.payload_json as string)
  } else {
    pageData = await payload.findByID({
      collection: 'pages',
      id: params.slug,
    })
  }

  if (!pageData) {
    return <div>Page not found</div>
  }

  return (
    <main>
      <Hero data={pageData} />
      <RenderBlocks layout={pageData.body.layout} />
      <Toaster />
    </main>
  )
}

export const revalidate = 10 // Mantén el ISR para las versiones publicadas
