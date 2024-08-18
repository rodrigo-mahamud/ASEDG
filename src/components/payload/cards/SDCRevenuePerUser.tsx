import { Card, CardContent, CardHeader, CardTitle } from '@/components/lib/card'
import { getRevenue, getVisitors } from '@/utils/dashboard/data'
import { IconCurrencyDollar } from '@tabler/icons-react'

export default async function SDCRevenuePerUser({ className, logType, period }: any) {
  const revenue = await getRevenue(period, logType)

  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-medium mb-1">Ingresos por usuario</CardTitle>
        <IconCurrencyDollar className="size-6 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-4xl font-bold"> {revenue.revenuePerUser}€</div>
        <p className="text-muted-foreground useTw ">Ingresos por usuario registrado.</p>
      </CardContent>
    </Card>
  )
}
