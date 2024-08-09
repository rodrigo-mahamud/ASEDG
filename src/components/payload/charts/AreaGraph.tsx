'use client'
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/lib/chart'
import { format, isValid, setDefaultOptions } from 'date-fns'
import { es } from 'date-fns/locale'
setDefaultOptions({ locale: es })
const chartConfig = {
  amount: {
    label: 'Nº de accesos:',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig
export default function AreaGraph({ chartData, period }) {
  return (
    <ChartContainer config={chartConfig} className="aspect-auto h-full w-full">
      <AreaChart
        accessibilityLayer
        data={chartData}
        margin={{
          top: 15,
          left: 0,
          right: 0,
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
            if (!isValid(date)) return value
            if (period === 'day') {
              return format(date, 'HH:mm')
            } else {
              return format(date, 'd MMM')
            }
          }}
        />
        <ChartTooltip
          cursor={true}
          content={
            <ChartTooltipContent
              labelFormatter={(value) => {
                const date = new Date(value)
                if (!isValid(date)) return value
                if (period === 'day') {
                  return format(date, 'HH:mm')
                } else {
                  return format(date, 'eeee d/MM/y')
                }
              }}
              labelClassName="capitalize"
              className=" shadow-md shadow-black/65 min-w-40 text-sm p-3"
              indicator={'line'}
            />
          }
        />
        <defs>
          <linearGradient id="fillamount" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--color-amount)" stopOpacity={0.8} />
            <stop offset="95%" stopColor="var(--color-amount)" stopOpacity={0.1} />
          </linearGradient>
        </defs>
        <Area
          dataKey="amount"
          type="monotone"
          fill="url(#fillamount)"
          fillOpacity={0.4}
          stroke="var(--color-amount)"
          stackId="a"
        />
      </AreaChart>
    </ChartContainer>
  )
}
