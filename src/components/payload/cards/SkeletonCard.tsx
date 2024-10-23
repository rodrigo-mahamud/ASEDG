import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export function SkeletonCard() {
  return (
    <Card className="h-full relative border border-border w-1/4">
      <CardHeader className="flex pb-4">
        <div className="flex flex-col justify-evenly w-full ">
          <CardTitle className="mb-1 flex justify-between">
            <Skeleton className="h-5 w-2/3" />
            <Skeleton className="h-5 w-5" />
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <Skeleton className="h-10 w-1/4" />
        <Skeleton className="h-5 w-11/12 mt-2" />
      </CardContent>
    </Card>
  )
}
