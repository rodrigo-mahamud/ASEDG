import React, { useMemo } from 'react'
import { Gutter } from '@payloadcms/ui'
import { Suspense } from 'react'
import ClientsSection from './ClientsSection'
import VisitorsCharts from './VisitorsCharts'
import SDToolbar from './SDToolbar'
import { SkeletonChart } from './charts/SkeletonChart'
import RevenueChart from './RevenueChart'
import SDCActiveUsers from './cards/SDCActiveUsers'
import SDCAverageAccess from './cards/SDCAverageAccess'
import SDCRevenuePerUser from './cards/SDCRevenuePerUser'
import SDCPeakHour from './cards/SDCPeakHour'
import { SDUsersAge } from './SDUsersAge'
import { SkeletonCard } from './cards/SkeletonCard'

// Función para generar una key única
const generateKey = (base: string, period: string) => `${base}-${period}-${Date.now()}`

export default function SportsDashboard({ searchParams }: { searchParams?: any }) {
  const period = searchParams?.period || 'week'

  // Uso de useMemo para generar keys únicas que solo cambian cuando period cambia
  const keys = useMemo(
    () => ({
      activeUsers: generateKey('active-users', period),
      averageAccess: generateKey('average-access', period),
      revenuePerUser: generateKey('revenue-per-user', period),
      peakHour: generateKey('peak-hour', period),
      visitorsCharts: generateKey('visitors-charts', period),
      revenueChart: generateKey('revenue-chart', period),
      usersAge: generateKey('users-age', period),
    }),
    [period],
  )

  return (
    <Gutter className="useTw space-y-6 ">
      <SDToolbar period={period} />
      <div className="flex gap-6 w-full">
        <Suspense key={keys.activeUsers} fallback={<SkeletonCard />}>
          <SDCActiveUsers className="w-1/4 border border-border" />
        </Suspense>
        <Suspense key={keys.averageAccess} fallback={<SkeletonCard />}>
          <SDCAverageAccess
            period={period}
            logType={'door_openings'}
            className="w-1/4 border border-border"
          />
        </Suspense>
        <Suspense key={keys.revenuePerUser} fallback={<SkeletonCard />}>
          <SDCRevenuePerUser
            period={period}
            logType={'admin_activity'}
            className="w-1/4 border border-border"
          />
        </Suspense>
        <Suspense key={keys.peakHour} fallback={<SkeletonCard />}>
          <SDCPeakHour
            period={period}
            logType={'admin_activity'}
            className="w-1/4 border border-border"
          />
        </Suspense>
      </div>
      <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-7 h-[30rem] relative ">
          <Suspense key={keys.visitorsCharts} fallback={<SkeletonChart />}>
            <VisitorsCharts period={period} logType={'door_openings'} />
          </Suspense>
        </div>
        <div className="col-span-5 h-[30rem] relative">
          <Suspense key={keys.revenueChart} fallback={<SkeletonChart />}>
            <RevenueChart period={period} logType={'admin_activity'} />
          </Suspense>
        </div>
        <div className="col-span-2 h-[30rem] relative">
          <Suspense key={keys.usersAge} fallback={<SkeletonChart />}>
            <SDUsersAge />
          </Suspense>
        </div>
      </div>
      <div className="w-full">
        <ClientsSection />
      </div>
    </Gutter>
  )
}
