import * as React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/lib/card'
import { PieAge } from './charts/PieAge'
import { getAges } from '@/utils/dashboard/data'

export async function SDUsersAge({ period }: { period: string }) {
  //   const totalVisitors = React.useMemo(() => {
  //     return chartData.reduce((acc, curr) => acc + curr.visitors, 0)
  //   }, [])
  const ageData = await getAges()

  return (
    <Card className="flex flex-col h-full border border-white/15">
      <CardHeader className="items-start h-1/4 border-b border-border justify-evenly flex flex-col space-y-0">
        <CardTitle>Edad de los usuarios</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0 h-4/3">
        <PieAge data={ageData.data} average={ageData.average}></PieAge>
      </CardContent>
    </Card>
  )
}
