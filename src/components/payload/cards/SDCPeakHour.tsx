import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getPeakHour, getRevenue, getVisitors } from '@/utils/dashboard/actions'
import { IconCurrencyDollar, IconFlame } from '@tabler/icons-react'

export default async function SDCPeakHour({ className, logType, period }: any) {
  const peakHour = await getPeakHour(period, logType)

  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-medium mb-1">Hora punta</CardTitle>
        <IconFlame className="size-6 text-muted-foreground" />
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
