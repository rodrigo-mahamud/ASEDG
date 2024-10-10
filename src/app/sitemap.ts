import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'
import type { MetadataRoute } from 'next'
export default async function sitemap() {
  const baseUrl = `https://${process.env.ROOT_DOMAIN}`
  const payload = await getPayloadHMR({ config: configPromise })
  const pages = await payload.find({
    collection: 'pages',
  })
  const pagesSlugs = pages?.docs.map((page) => {
    return {
      url: `${baseUrl}/${page.slug}`,
      lastModified: page.updatedAt,
    }
  })
  const news = await payload.find({
    collection: 'news',
  })
  const newsSlugs = news?.docs.map((news) => {
    return {
      url: `${baseUrl}/${news.slug}`,
      lastModified: news.updatedAt,
    }
  })
  return [...pagesSlugs, ...newsSlugs]
}
