import React from 'react'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'
import RenderBlocks from '@/components/RenderBlocks'
import Hero from '@/components/hero/Hero'
import SEO from '@/components/SEO'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  return [{}]
}

export default async function NewsMainPage() {
  try {
    const payload = await getPayloadHMR({ config: configPromise })
    const indexPage = await payload.find({
      collection: 'pages',
      where: {
        'header.pagetype': {
          equals: 'indexPage',
        },
      },
    })

    if (!indexPage || indexPage.docs.length === 0) {
      notFound()
    }

    const data = indexPage.docs[0]

    // Asumiendo que los metadatos SEO están en data.meta
    const seoData = data.meta || {}

    return (
      <>
        <main>
          <Hero data={data} />
          {data.body && data.body.layout && <RenderBlocks layout={data.body.layout} />}
        </main>
      </>
    )
  } catch (error) {
    console.error('Error al cargar la página principal de noticias:', error)
    return <div>Error al cargar la página. Por favor, revisa que existe el contenido.</div>
  }
}

export const revalidate = 60
