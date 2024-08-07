import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/lib/card'
import { Skeleton } from '@/components/lib/skeleton'

export function SkeletonChart() {
  return (
    <Card className={'h-full relative border border-border'}>
      <CardHeader className="flex h-1/4 items-stretch space-y-0 border-b border-border p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-evenly gap-3 px-6 py-5 sm:py-6">
          <CardTitle>
            <Skeleton className="h-6 w-56" />
          </CardTitle>
          <CardDescription>
            <Skeleton className="h-6 w-80" />
          </CardDescription>
        </div>
        <div className="flex">
          <div className="flex flex-1 flex-col justify-center gap-1 border-t border-border px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6">
            <span className="text-lg font-bold leading-none sm:text-3xl">
              <Skeleton className="h-4 w-11 mb-2" />
              <Skeleton className="h-6 w-14" />
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6 h-3/4">
        <Skeleton className="h-full w-full" />
      </CardContent>
    </Card>
  )
}
