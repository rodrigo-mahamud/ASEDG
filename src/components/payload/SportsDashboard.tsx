import React from 'react'
import { Gutter } from '@payloadcms/ui'

import { Suspense } from 'react'
import ClientsSection from './ClientsSection'
import { SkeletonTable } from './table/SkeletonTable'
import VisitorsCharts from './VisitorsCharts'
import SDToolbar from './SDToolbar'
import { SkeletonChart } from './charts/SkeletonChart'
import AreaSellsChart from './charts/AreaRevenue'
import { PieAge } from './charts/PieAge'
import RevenueChart from './RevenueChart'
import SDCards from './cards/SDCards'
import { SDUsersAge } from './SDUsersAge'

export default function SportsDashboard({ searchParams }: { searchParams?: any }) {
  const period = searchParams?.period || 'day'
  return (
    <Gutter className="useTw space-y-8">
      <SDToolbar period={period}></SDToolbar>
      <div className="flex gap-8 w-full">
        <Suspense key={period} fallback={<SkeletonChart></SkeletonChart>}>
          <SDCards
            period={period}
            logType={'admin_activity'}
            className="w-1/4 border border-border"
          ></SDCards>
        </Suspense>
        <SDCards
          period={period}
          logType={'admin_activity'}
          className="w-1/4 border border-border"
        ></SDCards>
        <SDCards
          period={period}
          logType={'admin_activity'}
          className="w-1/4 border border-border"
        ></SDCards>
        <SDCards
          period={period}
          logType={'admin_activity'}
          className="w-1/4 border border-border"
        ></SDCards>
      </div>
      <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-7 h-[30rem] relative ">
          <Suspense key={period} fallback={<SkeletonChart></SkeletonChart>}>
            <VisitorsCharts period={period} logType={'door_openings'}></VisitorsCharts>
          </Suspense>
        </div>
        <div className="col-span-5 h-[30rem] relative">
          <Suspense key={period} fallback={<SkeletonChart></SkeletonChart>}>
            <RevenueChart period={period} logType={'admin_activity'} />
          </Suspense>
        </div>
        <div className="col-span-2 h-[30rem] relative">
          <Suspense key={period} fallback={<SkeletonChart></SkeletonChart>}>
            <SDUsersAge period={period} />
          </Suspense>
          <PieAge />
        </div>
      </div>
      <div className="w-full">
        <ClientsSection></ClientsSection>
      </div>
    </Gutter>
  )
}
