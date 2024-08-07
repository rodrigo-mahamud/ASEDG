import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/lib/card'
import { Skeleton } from '@/components/lib/skeleton'

export function SkeletonChart() {
  return (
    <Card className={'h-full relative border border-border'}>
      <CardHeader className="flex h-1/4 flex-col items-stretch space-y-0 border-b border-border p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-evenly gap-3 px-6 py-5 sm:py-6">
          <CardTitle>
            <Skeleton className="h-6 w-56" />
          </CardTitle>
          <CardDescription>
            <Skeleton className="h-6 w-80" />
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6 h-3/4">
        <Skeleton className="h-full w-full" />
      </CardContent>
    </Card>
  )
}
