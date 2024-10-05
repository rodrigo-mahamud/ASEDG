import { cn } from '@/utils/utils'
import React from 'react'
interface containerTypes {
  children: React.ReactNode
  className?: string
}
export default function Container({ children, className }: containerTypes) {
  return <div className={cn(' container relative py-24', className)}>{children}</div>
}
