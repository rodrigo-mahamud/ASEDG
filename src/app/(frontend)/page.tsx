import React from 'react'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'
import RenderBlocks from '@/components/RenderBlocks'
import IndexHero from '@/components/IndexHero'
import Hero from '@/components/Hero'

// TODO:  fix the types in findGlobal and pageData
export default async function HomePage() {
  const payload = await getPayloadHMR({ config: configPromise })

  // Obtener configuración global
  const settings = (await payload.findGlobal({ slug: 'settings' })) as any

  // Obtener la página con el id especificado en settings.homepage.id
  const pageId = settings.homePage.id
  const pageData = (await payload.findByID({
    collection: 'pages',
    id: pageId,
  })) as any

  if (!pageData) {
    return <main>No se encontró la página principal.</main>
  }

  const page = pageData

  return (
    <main>
      {page.header.style === 'inicio' ? (
        <IndexHero data={page.header} />
      ) : (
        <Hero data={page.header} />
      )}
      <RenderBlocks layout={page.body.layout} />
    </main>
  )
}
