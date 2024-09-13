'use client'
import React from 'react'
import { Badge } from '../lib/badge'
import Container from '../Container'
import { Avatar } from '../lib/avatar'
import { AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import ShareButton from '../lib/shareButton'
import { usePathname } from 'next/navigation'
import { Separator } from '../lib/separator'
import Image from 'next/image'
import NHVertical from './NHVertical'
import NHHorizontal from './NHHorizontal'

export default function NewsHeader({ style = 'horizontal' }) {
  const pathname = usePathname()

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
