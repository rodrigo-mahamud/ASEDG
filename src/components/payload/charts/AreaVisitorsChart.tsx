'use client'

import { useEffect, useMemo, useState } from 'react'
import { Area, AreaChart, CartesianGrid, Line, LineChart, XAxis } from 'recharts'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/lib/card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/lib/chart'
import { getActivityLogs } from '@/utils/dashboard/data'

const chartConfig = {
  views: {
    label: 'Page Views',
  },
  amount: {
    label: 'amount',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig

export default function AreaVisitorsChart() {
  const [activeChart, setActiveChart] = useState<keyof typeof chartConfig>('amount')
  const [chartData, setchartData] = useState<ActivityLog[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  useEffect(() => {
    const fetchchartData = async () => {
      try {
        setIsLoading(true)
        // Ejemplo: obtener logs del último mes
        const endDate = new Date()
        const startDate = new Date()
        startDate.setMonth(startDate.getMonth() - 1)

        const logs = await getActivityLogs(
          Math.floor(startDate.getTime() / 1000),
          Math.floor(endDate.getTime() / 1000),
        )
        setchartData(logs)
        console.log(logs)
      } catch (err) {
        setError('Error al cargar los logs de actividad')
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchchartData()
  }, [])

  const total = useMemo(
    () => ({
      amount: chartData.reduce((acc, curr) => acc + curr.amount, 0),
    }),
    [],
  )

  return (
    <Card className={'h-full relative border border-white/15'}>
      <CardHeader className="flex h-1/4 flex-col items-stretch space-y-0 border-b border-border p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-evenly px-6 py-5 sm:py-6">
          <CardTitle>Line Chart - Interactive</CardTitle>
          <CardDescription>Showing total visitors for the last 3 months</CardDescription>
        </div>
        <div className="flex">
          {['amount'].map((key) => {
            const chart = key as keyof typeof chartConfig
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="flex flex-1 flex-col justify-center gap-1 border-t border-border px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-xs text-muted-foreground">{chartConfig[chart].label}</span>
                <span className="text-lg font-bold leading-none sm:text-3xl">
                  {total[key as keyof typeof total].toLocaleString()}
                </span>
              </button>
            )
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6 h-3/4">
        <ChartContainer config={chartConfig} className="aspect-auto h-full w-full">
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString('es-ES', {
                  month: 'short',
                  day: 'numeric',
                })
              }}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <defs>
              <linearGradient id="fillamount" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-amount)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-amount)" stopOpacity={0.1} />
              </linearGradient>
            </defs>

            <Area
              dataKey={activeChart}
              type="natural"
              fill="url(#fillamount)"
              fillOpacity={0.4}
              stroke="var(--color-amount)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
