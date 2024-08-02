import React from 'react'
import { Gutter } from '@payloadcms/ui'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../lib/card'
import PentagonChart from './charts/PentagonChart'
import { PieTextChart } from './charts/PieTextChart'
import AreaSellsChart from './charts/AreaSellsChart'
import AreaVisitorsChart from './charts/AreaGraph'
import { Suspense } from 'react'
import ClientsSection from './ClientsSection'
import { Skeleton } from '../lib/skeleton'
import { SkeletonTable } from './table/SkeletonTable'
import VisitorsCharts from './VisitorsCharts'
import { AsyncWrapper } from '../AsyncWrapper'
import { getActivityLogs } from '@/utils/dashboard/data'
export default function SportsDashboard() {
  const currentDate = new Date()

  // Fecha de hace 3 meses
  const threeMonthsAgo = new Date()
  threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3)
  return (
    <Gutter className="useTw space-y-8">
      <h1 className="useTw text-4xl font-semibold">Hola Alejandro👋</h1>
      <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-7 h-[30rem] relative ">
          <Suspense fallback={<SkeletonTable></SkeletonTable>}>
            <AsyncWrapper
              fetchData={() => getActivityLogs()}
              fetchParams={[currentDate, threeMonthsAgo]}
              Component={VisitorsCharts}
            />
          </Suspense>
        </div>
        {/* <div className="col-span-5 h-[30rem] relative">
          <AreaSellsChart />
        </div>
        <div className="col-span-2 h-[30rem] relative">
          <PieTextChart />
        </div> */}
      </div>
      <div className="w-full">
        <ClientsSection></ClientsSection>
      </div>
    </Gutter>
  )
}
