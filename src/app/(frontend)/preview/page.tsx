import { getPayloadHMR } from '@payloadcms/next/utilities'
import config from '@payload-config'
import { RefreshRouteOnSave } from '@/components/RefreshRouteOnSave'
import RenderBlocks from '@/components/RenderBlocks'
import Hero from '@/components/Hero'
import { Toaster } from 'sonner'
import IndexHero from '@/components/IndexHero'

export default async function Page() {
  const payload = await getPayloadHMR({ config })

  const pageData = await payload.findByID({
    collection: 'pages',
    id: '66c62429ef50e2feeac4cbff',
    draft: true,
  })

  return (
    <>
      <RefreshRouteOnSave />
      {pageData.header && pageData.header.style === 'inicio' ? (
        <IndexHero data={pageData.header} />
      ) : pageData.header ? (
        <Hero data={pageData.header} />
      ) : null}
      <RenderBlocks layout={pageData.body.layout} />
      <Toaster />
    </>
  )
}
