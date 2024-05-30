import getData from '@/app/(frontend)/utils/getData'
import React from 'react'
import { Nav } from './lib/nav'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import config from '@payload-config'

const payload = await getPayloadHMR({ config })

const data = payload.findGlobal({
  slug: 'header',
})

export default function NavBar() {
  return <Nav></Nav>
}
