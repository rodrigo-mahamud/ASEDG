import * as React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { PieAge } from './charts/PieAge'
import { getAges } from '@/utils/dashboard/actions'

export async function SDUsersAge() {
  //   const totalVisitors = React.useMemo(() => {
  //     return chartData.reduce((acc, curr) => acc + curr.visitors, 0)
  //   }, [])
  const ageData = await getAges()

  return (
    <Card className="flex flex-col h-full border border-white/15">
      <CardHeader className="items-start h-1/4 border-b border-border justify-evenly flex flex-col space-y-0">
        <CardTitle>Edad usuarios activos</CardTitle>
        <CardDescription>Muestra la edad y la media del conjunto.</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0 h-4/3">
        <PieAge data={ageData.data} average={ageData.average}></PieAge>
      </CardContent>
    </Card>
  )
}
