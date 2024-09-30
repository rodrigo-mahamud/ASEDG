import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = `https://${process.env.ROOT_DOMAIN}`
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/preview/', '/admin/'],
    },
    sitemap: `${baseUrl}`,
  }
}
