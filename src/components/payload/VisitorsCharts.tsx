import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/lib/card'
import AreaGraph from './charts/AreaGraph'
import { Suspense } from 'react'
import { SkeletonTable } from './table/SkeletonTable'
import { AsyncWrapper } from '../AsyncWrapper'
import { getActivityLogs } from '@/utils/dashboard/data'

export default async function VisitorsCharts({ period, logType }) {
  const activityLogs = await getActivityLogs(period, logType)

  return (
    <Card className={'h-full relative border border-white/15'}>
      <CardHeader className="flex h-1/4 flex-col items-stretch space-y-0 border-b border-border p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-evenly px-6 py-5 sm:py-6">
          <CardTitle>Visitantes hoy</CardTitle>
          <CardDescription>Showing total visitors for the last 3 months</CardDescription>
        </div>
        {/* <div className="flex">
          <button className="flex flex-1 flex-col justify-center gap-1 border-t border-border px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6">
            <span className="text-lg font-bold leading-none sm:text-3xl">
              TOTAL:
              {total.amount.toLocaleString()}
            </span>
          </button>
          <button className="flex flex-1 flex-col justify-center gap-1 border-t border-border px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6">
            <span className="text-lg font-bold leading-none sm:text-3xl">
              {total.amount.toLocaleString()}
            </span>
          </button>
        </div> */}
      </CardHeader>

      <CardContent className="px-2 sm:p-6 h-3/4">
        <AreaGraph chartData={activityLogs} />
      </CardContent>
    </Card>
  )
}
