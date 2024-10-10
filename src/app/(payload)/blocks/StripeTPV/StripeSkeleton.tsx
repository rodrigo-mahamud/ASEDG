import { Skeleton } from '@/components/lib/skeleton'
import React from 'react'

export default function StripeSkeleton() {
  return (
    <div className="space-y-5 py-4 h-full">
      <Skeleton className="h-64 w-full" />
    </div>
  )
}
