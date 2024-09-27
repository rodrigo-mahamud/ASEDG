import { getPayloadHMR } from '@payloadcms/next/utilities'
import config from '@payload-config'
import { RefreshRouteOnSave } from '@/components/RefreshRouteOnSave'
import RenderBlocks from '@/components/RenderBlocks'
import Hero from '@/components/Hero'
import { Toaster } from 'sonner'
import IndexHero from '@/components/IndexHero'
import { notFound } from 'next/navigation'

export default async function PreviewPage({ params }: { params: { slug: string } }) {
  const payload = await getPayloadHMR({ config })

  const pageData = await payload.find({
    collection: 'pages',
    where: {
      slug: {
        equals: params.slug,
      },
    },
    limit: 1,
    draft: true,
  })

  if (!pageData.docs[0]) {
    notFound()
  }

  const page = pageData.docs[0]

  return (
    <>
      <RefreshRouteOnSave />
      {page.header && page.header.style === 'inicio' ? (
        <IndexHero data={page.header} />
      ) : page.header ? (
        <Hero data={page.header} />
      ) : null}
      <RenderBlocks layout={page.body.layout} />
      <Toaster />
    </>
  )
}
