import { getPayloadHMR } from '@payloadcms/next/utilities'

import React from 'react'

export default async function getData() {
  const payload = await getPayloadHMR({ config })

  return payload.find({ collection: 'Pages' })
}
