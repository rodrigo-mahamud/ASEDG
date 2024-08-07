import React from 'react'
import { Gutter } from '@payloadcms/ui'
import { Suspense } from 'react'
import ClientsSection from './ClientsSection'
import { SkeletonTable } from './table/SkeletonTable'
import VisitorsCharts from './VisitorsCharts'
import SDToolbar from './SDToolbar'
import { SkeletonChart } from './charts/SkeletonChart'

export default function SportsDashboard({ searchParams }: { searchParams?: any }) {
  const period = searchParams?.period || 'currentmonth'
  return (
    <Gutter className="useTw space-y-8">
      <SDToolbar period={period}></SDToolbar>
      <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-7 h-[30rem] relative ">
          <Suspense key={period} fallback={<SkeletonChart></SkeletonChart>}>
            <VisitorsCharts period={period} logType={'door_openings'}></VisitorsCharts>
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
