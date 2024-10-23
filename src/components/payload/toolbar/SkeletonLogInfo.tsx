import { Skeleton } from '@/components/lib/skeleton'

export function SkeletonLogInfo() {
  return (
    <div className="relative flex flex-col space-y-5 mt-12">
      <Skeleton className="w-5/6 h-6" />
      <Skeleton className="w-full h-4 rounded-sm" />
      <Skeleton className="w-full h-4 rounded-sm" />
      <Skeleton className="w-full h-4 rounded-sm" />
      <Skeleton className="w-full h-4 rounded-sm" />
      <Skeleton className="w-full h-4 rounded-sm" />
      <Skeleton className="w-full h-4 rounded-sm" />
      <Skeleton className="w-full h-4 rounded-sm" />
      <Skeleton className="w-full h-4 rounded-sm" />
    </div>
  )
}
