import React from 'react'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'
import Hero from '@/components/Hero'

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

export default async function Page({ params }: { params: { slug: string } }) {
  const payload = await getPayloadHMR({ config: configPromise })
  const pageData = (await payload.find({
    collection: 'pages',
  })) as any

  const page = pageData.docs.find((page: any) => page.slug === params.slug)

  if (!page) {
    return <div>Page not found</div>
  }

  return (
    <main>
      <Hero data={page.header} />
      {/* Aquí puedes renderizar el contenido del cuerpo de la página */}
    </main>
  )
}
