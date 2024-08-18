import { Card, CardContent, CardHeader, CardTitle } from '@/components/lib/card'
import { getActivityLogs, getRevenue } from '@/utils/dashboard/data'
import { IconEyeDollar } from '@tabler/icons-react'
export default async function SDCAverageVisitors({ className, logType, period }: any) {
  const activityLogs = await getActivityLogs(period, logType)

  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-medium mb-1">Media de accesos</CardTitle>
        <IconEyeDollar className="size-6 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-4xl font-bold"> {activityLogs.average}</div>
        <p className="text-muted-foreground useTw">Media de usuarios que acceden al </p>
      </CardContent>
    </Card>
  )
}
