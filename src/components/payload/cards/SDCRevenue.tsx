import { Card, CardContent, CardHeader, CardTitle } from '@/components/lib/card'
import { getRevenue } from '@/utils/dashboard/data'
import { IconEyeDollar } from '@tabler/icons-react'

export default async function SDCRevenue({ className, logType, period }: any) {
  const activityLogs = await getRevenue(period, logType)

  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-medium mb-1">PASTRTA</CardTitle>
        <IconEyeDollar className="size-6 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold mb-1"> {activityLogs.totalRevenue}€</div>
      </CardContent>
    </Card>
  )
}
