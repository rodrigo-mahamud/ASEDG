import { Skeleton } from '@/components/lib/skeleton'
import { cn } from '@/utils/utils'
import React from 'react'

export default function StripeSkeleton({ className }: any) {
  return (
    <div className={cn(` ${className}`)}>
      <Skeleton className="w-full h-full" />
    </div>
  )
}
