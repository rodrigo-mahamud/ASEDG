import React from 'react'
import { Gutter } from '@payloadcms/ui'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../lib/card'

import { RecentSales } from './recent-sales'
import PentagonChart from './charts/PentagonChart'
import { PieTextChart } from './charts/PieTextChart'
import AreaSellsChart from './charts/AreaSellsChart'
import AreaVisitorsChart from './charts/AreaVisitorsChart'
import ClientsTable from './ClientsTable'

export default function SportsDashboard() {
  return (
    <Gutter className="useTw">
      <div className="space-y-4 useTw">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="useTw">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 useTw">
              <CardTitle className="text-sm font-medium useTw">Total Revenue</CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-muted-foreground"
              >
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold useTw">$45,231.89</div>
              <p className="text-xs text-muted-foreground useTw">+20.1% from last month</p>
            </CardContent>
          </Card>
          <Card className="useTw">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 useTw">
              <CardTitle className="text-sm font-medium useTw">Total Revenue</CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-muted-foreground"
              >
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold useTw">$45,231.89</div>
              <p className="text-xs text-muted-foreground useTw">+20.1% from last month</p>
            </CardContent>
          </Card>
          <Card className="useTw">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 useTw">
              <CardTitle className="text-sm font-medium useTw">Total Revenue</CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-muted-foreground"
              >
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold useTw">$45,231.89</div>
              <p className="text-xs text-muted-foreground useTw">+20.1% from last month</p>
            </CardContent>
          </Card>
          <Card className="useTw">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 useTw">
              <CardTitle className="text-sm font-medium useTw">Total Revenue</CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-muted-foreground"
              >
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold useTw">$45,231.89</div>
              <p className="text-xs text-muted-foreground useTw">+20.1% from last month</p>
            </CardContent>
          </Card>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7">
          <div className="col-span-7 h-[30rem] relative">
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
          <ClientsTable></ClientsTable>
        </div>
      </div>
    </Gutter>
  )
}
