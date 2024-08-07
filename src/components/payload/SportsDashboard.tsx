import React from 'react'
import { Gutter } from '@payloadcms/ui'

import { Suspense } from 'react'
import ClientsSection from './ClientsSection'
import { SkeletonTable } from './table/SkeletonTable'
import VisitorsCharts from './VisitorsCharts'
import { AsyncWrapper } from '../AsyncWrapper'
import { getActivityLogs } from '@/utils/dashboard/data'
import SDashboardToolbar from './SDashboardToolbar'
import { getUnixTime, subDays, subMonths } from 'date-fns'

export default function SportsDashboard() {
  const period = ''
  const currentDate = new Date()
  // Fecha de hace 3 meses
  const threeMonthsAgo = subDays(currentDate, 1)

  // Convertir a formato Unix (segundos desde la época Unix)
  const currentDateUnix = getUnixTime(currentDate)
  const threeMonthsAgoUnix = getUnixTime(threeMonthsAgo)
  return (
    <Gutter className="useTw space-y-8">
      <SDashboardToolbar></SDashboardToolbar>
      <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-7 h-[30rem] relative ">
          <Suspense fallback={<SkeletonTable></SkeletonTable>}>
            <AsyncWrapper
              fetchData={() => getActivityLogs(currentDateUnix, threeMonthsAgoUnix)}
              fetchParams={[]}
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
