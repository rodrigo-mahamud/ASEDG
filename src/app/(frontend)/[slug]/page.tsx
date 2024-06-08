import React from 'react'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'
import Hero from '@/components/Hero'

export default async function page({ params }: any) {
  const payload = await getPayloadHMR({ config: configPromise })
  const pageData = (await payload.find({
    collection: 'pages',
  })) as any

  const page = pageData
  return (
    <main>
      <Hero data={page.header}></Hero>
    </main>
  )
}
