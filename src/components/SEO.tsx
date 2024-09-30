interface SEOProps {
  title: string
  description: string
  image?: string
  url: string
}

export default function SEO({ title, description, image, url }: SEOProps) {
  const metadata = {
    title: title,
    description: description,
  }
  return metadata
}
