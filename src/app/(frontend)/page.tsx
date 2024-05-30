import { getPayloadHMR } from '@payloadcms/next/utilities'

import configPromise from '@payload-config'
import RenderBlocks from '@/components/RenderBlocks'
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
  const isHomepage = true // Marcar como página principal

  return (
    <main>
      <RenderBlocks layout={page.layout} isHomepage={isHomepage} />
    </main>
  )
}
