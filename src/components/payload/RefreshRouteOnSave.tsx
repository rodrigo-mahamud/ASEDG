'use client'
import { RefreshRouteOnSave as PayloadLivePreview } from '@payloadcms/live-preview-react'
import { useRouter } from 'next/navigation.js'
import React from 'react'

export const RefreshRouteOnSave: React.FC = () => {
  const router = useRouter()
  if (process.env.ROOT_DOMAIN) {
    return (
      <PayloadLivePreview refresh={() => router.refresh()} serverURL={process.env.ROOT_DOMAIN} />
    )
  }
}
