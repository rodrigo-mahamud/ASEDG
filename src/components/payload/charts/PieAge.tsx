'use client'
import * as React from 'react'
import { Label, Pie, PieChart } from 'recharts'
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/lib/chart'

const chartConfig = {
  a: { label: '15-20', color: 'hsl(var(--chart-1))' },
  b: { label: '20-30', color: 'hsl(var(--chart-1))' },
  c: { label: '30-40', color: 'hsl(var(--chart-2))' },
  d: { label: '40-50', color: 'hsl(var(--chart-3))' },
  e: { label: '50-60', color: 'hsl(var(--chart-4))' },
  f: { label: '60+', color: 'hsl(var(--chart-5))' },
} satisfies ChartConfig

export function PieAge({ period, chartData }: any) {
  const processedChartData = React.useMemo(() => {
    if (!chartData || !Array.isArray(chartData)) {
      return []
    }
    return chartData.map((item) => ({
      ...item,
      fill: chartConfig[item.ages as keyof typeof chartConfig]?.color || 'hsl(var(--chart-1))',
    }))
  }, [chartData])

  if (!chartData || processedChartData.length === 0) {
    return <div>No hay datos disponibles para mostrar.</div>
  }

  return (
    <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-80">
      <PieChart>
        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
        <Pie
          data={processedChartData}
          dataKey="amount"
          nameKey="ages"
          innerRadius={60}
          strokeWidth={5}
          fillRule="evenodd"
        >
          <Label
            content={({ viewBox }) => {
              if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                return (
                  <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                    <tspan
                      x={viewBox.cx}
                      y={viewBox.cy}
                      className="fill-foreground text-3xl font-bold"
                    ></tspan>
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) + 24}
                      className="fill-muted-foreground"
                    >
                      Visitors
                    </tspan>
                  </text>
                )
              }
            }}
          />
        </Pie>
        <ChartLegend
          content={<ChartLegendContent nameKey="ages" />}
          className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
        />
      </PieChart>
    </ChartContainer>
  )
}
