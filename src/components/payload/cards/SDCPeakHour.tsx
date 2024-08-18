import { Card, CardContent, CardHeader, CardTitle } from '@/components/lib/card'
import { getPeakHour, getRevenue, getVisitors } from '@/utils/dashboard/data'
import { IconCurrencyDollar } from '@tabler/icons-react'

export default async function SDCPeakHour({ className, logType, period }: any) {
  const peakHour = await getPeakHour(period, logType)

  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-medium mb-1">Hora punta</CardTitle>
        <IconCurrencyDollar className="size-6 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-4xl font-bold"> {peakHour.peakHour}</div>
        <p className="text-muted-foreground useTw ">
          {peakHour.percentage}% de los usuarios acuden a esta hora.
        </p>
      </CardContent>
    </Card>
  )
}
