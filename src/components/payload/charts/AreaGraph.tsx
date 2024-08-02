'use client'
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/lib/chart'
const chartConfig = {
  views: {
    label: 'Page Views',
  },
  amount: {
    label: 'amount',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig
export default function AreaGraph({ chartData }) {
  console.log(chartData.data)

  return (
    <ChartContainer config={chartConfig} className="aspect-auto h-full w-full">
      <AreaChart
        accessibilityLayer
        data={chartData.data}
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
          dataKey="amount"
          type="natural"
          fill="url(#fillamount)"
          fillOpacity={0.4}
          stroke="var(--color-amount)"
          stackId="a"
        />
      </AreaChart>
    </ChartContainer>
  )
}
