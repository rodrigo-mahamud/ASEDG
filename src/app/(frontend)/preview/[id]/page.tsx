import { getPayloadHMR } from '@payloadcms/next/utilities'
import config from '@payload-config'
import { RefreshRouteOnSave } from '@/components/RefreshRouteOnSave'
import RenderBlocks from '@/components/RenderBlocks'
import Hero from '@/components/hero/Hero'
import { Toaster } from 'sonner'
import { notFound } from 'next/navigation'
import { Alert } from '@/components/lib/alert'
import { IconAlertTriangle, IconInfoCircle } from '@tabler/icons-react'

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
      <Alert className="fixed bottom-3 right-2 z-50 w-fit m-0 flex items-center font-medium gap-1 rounded-full shadow bg-foreground border-0 text-white">
        <IconAlertTriangle color="#fff" size={18}></IconAlertTriangle>
        Vista previa.
      </Alert>
      <Hero data={pageData}></Hero>
      <RenderBlocks layout={pageData.body.layout} />
      <Toaster />
    </main>
  )
}
