import React from 'react'
import { Gutter } from '@payloadcms/ui'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../lib/card'

import { RecentSales } from './recent-sales'
import PentagonChart from './charts/PentagonChart'
import { PieTextChart } from './charts/PieTextChart'
import AreaSellsChart from './charts/AreaSellsChart'
import AreaVisitorsChart from './charts/AreaVisitorsChart'
import { Suspense } from 'react'
import ClientsSection from './ClientsSection'

export default function SportsDashboard() {
  return (
    <Gutter className="useTw space-y-8">
      <h1 className="useTw text-4xl font-semibold">Hola Alejandro👋</h1>
      <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-7 h-[30rem] relative ">
          <AreaVisitorsChart />
        </div>
        <div className="col-span-5 h-[30rem] relative">
          <AreaSellsChart />
        </div>
        <div className="col-span-2 h-[30rem] relative">
          <PieTextChart />
        </div>
      </div>
      <div className="w-full">
        <Suspense fallback={<>CARGANDO....</>}>
          <ClientsSection></ClientsSection>
        </Suspense>
      </div>
    </Gutter>
  )
}
