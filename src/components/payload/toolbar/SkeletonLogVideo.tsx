import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/lib/card'
import { Skeleton } from '@/components/lib/skeleton'

export function SkeletonLogVideo() {
  return (
    <Card className="h-full relative border border-border w-1/4">
      <Skeleton className="h-5 w-full mt-2" />
    </Card>
  )
}
