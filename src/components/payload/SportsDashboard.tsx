import React from 'react'
import { Gutter } from '@payloadcms/ui'

import { Suspense } from 'react'
import ClientsSection from './ClientsSection'
import { SkeletonTable } from './table/SkeletonTable'
import VisitorsCharts from './VisitorsCharts'
import { AsyncWrapper } from '../AsyncWrapper'
import { getActivityLogs } from '@/utils/dashboard/data'
import SDashboardToolbar from './SDashboardToolbar'

export default function SportsDashboard() {
  const currentDate = new Date()
  // Fecha de hace 3 meses
  const threeMonthsAgo = new Date()
  threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3)
  return (
    <Gutter className="useTw space-y-8">
      <SDashboardToolbar></SDashboardToolbar>
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
