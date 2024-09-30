// components/SEO.tsx
import Head from 'next/head'

interface SEOProps {
  title: string
  description: string
  image?: string
  url: string
}

const SEO: React.FC<SEOProps> = ({ title, description, image, url }) => (
  <Head>
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:url" content={url} />
    {image && <meta property="og:image" content={image} />}
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    {image && <meta name="twitter:image" content={image} />}
  </Head>
)

export default SEO
