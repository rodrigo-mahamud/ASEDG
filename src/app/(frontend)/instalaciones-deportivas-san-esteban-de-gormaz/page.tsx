import { getPayloadHMR } from '@payloadcms/next/utilities'
import { Toaster } from 'sonner'
import configPromise from '@payload-config'
import RenderBlocks from '@/components/RenderBlocks'
import Hero from '@/components/hero/Hero'
import { notFound } from 'next/navigation'
async function getPageData() {
  const payload = await getPayloadHMR({ config: configPromise })
  const indexPage = await payload.find({
    collection: 'pages',
    where: {
      'header.pagetype': {
        equals: 'facilitiesPage',
      },
    },
  })

  if (!indexPage || indexPage.docs.length === 0) {
    notFound()
  }

  return indexPage.docs[0]
}
async function getSettings() {
  const payload = await getPayloadHMR({ config: configPromise })
  const settings = (await payload.findGlobal({
    slug: 'settings',
  })) as any

  return settings
}
export async function generateMetadata() {
  const data = await getPageData()
  const seoData = data.meta || ({} as any)
  const settings = await getSettings()

  return {
    title: seoData.title || settings.defaultTitle,
    description: seoData.description || settings.defaultDescription,
    icons: {
      icon: [
        {
          url: settings.faviconLight ? settings.faviconLight.url : '/faviconPlaceholder.png',
          media: '(prefers-color-scheme: light)',
        },
        {
          url: settings.faviconDark ? settings.faviconDark.url : '/faviconPlaceholder.png',
          media: '(prefers-color-scheme: dark)',
        },
      ],
    },
    openGraph: {
      locale: 'es_ES',
      title: seoData.title || settings.defaultTitle || ' ',
      siteName: settings.defaultTitle,
      url: `https://${process.env.ROOT_DOMAIN}/instalaciones-deportivas-san-esteban-de-gormaz`,
      description: seoData.description || settings.defaultDescription,
      images: seoData?.image?.url || settings.defaultOgImage,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      domain: process.env.ROOT_DOMAIN,
      title: seoData.title || settings.defaultTitle,
      description: seoData.description || settings.defaultDescription,
      images: seoData?.image?.url || settings.defaultOgImage,
    },
  }
}
export default async function NewsMainPage() {
  try {
    const data = await getPageData()
    return (
      <main>
        <Toaster />
        <Hero data={data} />
        {data.body && data.body.layout && <RenderBlocks layout={data.body.layout} />}
      </main>
    )
  } catch (error) {
    return notFound()
  }
}
export const revalidate = 60
