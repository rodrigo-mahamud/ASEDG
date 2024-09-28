import React from 'react'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'
import RenderBlocks from '@/components/RenderBlocks'
import Hero from '@/components/hero/Hero'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  return [{}]
}
export default async function NewsMainPage() {
  try {
    const payload = await getPayloadHMR({ config: configPromise })
    const facilitiesPage = await payload.find({
      collection: 'pages',
      where: {
        'header.pagetype': {
          equals: 'facilitiesPage',
        },
      },
    })

    if (!facilitiesPage) {
      notFound()
    }

    const data = facilitiesPage.docs[0]

    return (
      <main>
        <Hero data={data} />
        {data.body && data.body.layout && <RenderBlocks layout={data.body.layout} />}
      </main>
    )
  } catch (error) {
    console.error('Error al cargar la página principal de noticias:', error)
    return <div>Error al cargar la página. Por favor, intente más tarde.</div>
  }
}
export const revalidate = 60
