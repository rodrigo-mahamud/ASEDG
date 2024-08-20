import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/lib/card'
import AreaGraph from './charts/AreaGraph'
import { getActivityLogs, getRevenue } from '@/utils/dashboard/actions'
import AreaSellsChart from './charts/AreaRevenue'
import AreaRevenue from './charts/AreaRevenue'

export default async function RevenueChart({
  period,
  logType,
}: {
  period: string
  logType?: string
}) {
  const activityLogs = await getRevenue(period, logType)

  const getPeriodDescription = (period: string | null) => {
    switch (period) {
      case 'day':
        return 'hoy'
      case 'week':
        return 'en los ultimos 7 días'
      case 'currentmonth':
        return 'en este mes'
      case 'pastmonth':
        return 'el mes pasado'
      case 'quarter':
        return 'en el ultimo trimestre'
      case 'year':
        return 'en este año'
      default:
        return 'Período no especificado'
    }
  }
  return (
    <Card className="h-full relative border border-white/15">
      <CardHeader className="flex h-1/4 flex-col items-stretch space-y-0 border-b border-border p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-evenly px-6 py-5 sm:py-6">
          <CardTitle>Usuarios e ingresos registrados {getPeriodDescription(period)}. </CardTitle>
          <CardDescription className="text-base">
            Muestra todos los usuarios registrados en a la instalacion{' '}
            {getPeriodDescription(period)}
          </CardDescription>
        </div>
        <div className="flex">
          <div className="flex flex-1 flex-col justify-center gap-1 border-t border-border px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6">
            <span className=" text-muted-foreground text-sm">Usuarios:</span>
            <span className="text-lg font-bold leading-none sm:text-3xl">
              {activityLogs.totalAmount}
            </span>
          </div>
          <div className="flex flex-1 flex-col justify-center gap-1 border-t border-border px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6">
            <span className=" text-muted-foreground text-sm">Ingresos:</span>
            <span className="text-lg font-bold leading-none sm:text-3xl">
              {activityLogs.totalRevenue}€
            </span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="px-2 sm:p-6 h-3/4">
        <AreaRevenue period={period} chartData={activityLogs.data} />
      </CardContent>
    </Card>
  )
}
