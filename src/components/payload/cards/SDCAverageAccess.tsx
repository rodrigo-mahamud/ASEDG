import { Card, CardContent, CardHeader, CardTitle } from '@/components/lib/card'
import { getActivityLogs, getRevenue } from '@/utils/dashboard/actions'
import { IconLogin } from '@tabler/icons-react'

export default async function SDCAverageAccess({ className, logType, period }: any) {
  const activityLogs = await getActivityLogs(period, logType)

  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <CardTitle className="text-lg font-medium">Media de accesos</CardTitle>
        <IconLogin className="size-6 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-4xl font-bold"> {activityLogs.average}</div>
        <p className="text-muted-foreground useTw">Media de usuarios que acceden al </p>
      </CardContent>
    </Card>
  )
}
