import { getPayloadHMR } from '@payloadcms/next/utilities'
import config from '@payload-config'
import { RefreshRouteOnSave } from '@/components/RefreshRouteOnSave'
import RenderBlocks from '@/components/RenderBlocks'
import Hero from '@/components/Hero'
import { Toaster } from 'sonner'
import IndexHero from '@/components/IndexHero'
import { notFound } from 'next/navigation'

export default async function PreviewPage({ params }: { params: { id: string } }) {
  const payload = await getPayloadHMR({ config })

  const pageData = await payload.findByID({
    collection: 'pages',
    id: params.id,
    draft: true,
  })

  if (!pageData) {
    notFound()
  }

  return (
    <main>
      <RefreshRouteOnSave />
      {pageData.header && pageData.header.style === 'inicio' ? (
        <IndexHero data={pageData.header} />
      ) : pageData.header ? (
        <Hero data={pageData.header} />
      ) : null}
      <RenderBlocks layout={pageData.body.layout} />
      <Toaster />
    </main>
  )
}
