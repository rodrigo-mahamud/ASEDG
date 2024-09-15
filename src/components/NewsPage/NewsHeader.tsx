'use client'
import React from 'react'
import { usePathname } from 'next/navigation'
import NHVertical from './NHVertical'
import NHHorizontal from './NHHorizontal'

export default function NewsHeader({ style = 'horizontal' }) {
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
      {style === 'vertical' && <NHVertical currentUrl={currentUrl}></NHVertical>}
      {style === 'horizontal' && <NHHorizontal currentUrl={currentUrl}></NHHorizontal>}
    </div>
  )
}
