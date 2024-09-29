'use client'
import React from 'react'
import { usePathname } from 'next/navigation'
import NHVertical from './NHVertical'
import NHHorizontal from './NHHorizontal'
import NHGallery from './NHGallery'
import { NewsHeaderProps } from '@/types/types'
import NHVideo from './NHVideo'

export default function NewsHeader({ data }: NewsHeaderProps) {
  const getCurrentUrl = () => {
    if (typeof window !== 'undefined') {
      const baseUrl = window.location.origin
      return `${baseUrl}`
    }
    return ''
  }

  const currentUrl = getCurrentUrl()
  return (
    <div className="pt-[84px]">
      {data.style === 'vertical' && <NHVertical data={data} currentUrl={currentUrl} />}
      {data.style === 'horizontal' && <NHHorizontal data={data} currentUrl={currentUrl} />}
      {data.style === 'video' && <NHVideo data={data} currentUrl={currentUrl} />}
      {data.style === 'masonry' && <NHGallery data={data} currentUrl={currentUrl} />}
    </div>
  )
}
