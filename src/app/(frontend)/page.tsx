import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'
import { Page } from 'payload/generated-types'

export default async function HomePage() {
  const payload = await getPayloadHMR({ config: configPromise })

  // Obtener configuración global
  const settings = await payload.findGlobal({ slug: 'settings' })

  if (!settings.homePage) {
    return {
      notFound: true,
    }
  }

  const homePage = await payload.findByID({
    collection: 'pages',
    id: settings.homePage.id,
  })

  if (!homePage) {
    return {
      notFound: true,
    }
  }

  return (
    <div>
      +hols
      <h1>{homePage.title}</h1>
      {/* <div dangerouslySetInnerHTML={{ __html: homePage.content }} /> */}
    </div>
  )
}
