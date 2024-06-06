import { cn } from '@/app/(frontend)/utils/utils'
import React from 'react'
interface containerTypes {
  children: React.ReactNode
  className?: string
}
export default function Container({ children, className }: containerTypes) {
  return <div className={cn(' container relative py-32', className)}>{children}</div>
}
