import React from 'react'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'
import RenderBlocks from '@/components/RenderBlocks'
import Hero from '@/components/hero/Hero'

export default async function HomePage() {
  try {
    const payload = await getPayloadHMR({ config: configPromise })

    // Obtener configuración global
    const settings = (await payload.findGlobal({ slug: 'settings' })) as any

    if (!settings || !settings.homePage || !settings.homePage.id) {
      return (
        <main>
          La configuración global no está completa. Por favor, configure la página de inicio en el
          CMS.
        </main>
      )
    }

    // Obtener la página con el id especificado en settings.homepage.id
    const pageId = settings.homePage.id
    const pageData = (await payload.findByID({
      collection: 'pages',
      id: pageId,
    })) as any

    if (!pageData) {
      return (
        <main>
          No se encontró la página principal. Por favor, verifique la configuración en el CMS.
        </main>
      )
    }

    const page = pageData

    return (
      <main>
        <Hero data={page}></Hero>

        {page.body && page.body.layout && <RenderBlocks layout={page.body.layout} />}
      </main>
    )
  } catch (error) {
    console.error('Error al cargar la página de inicio:', error)
    return <main>Error al cargar la página. Por favor, intente más tarde.</main>
  }
}
