'use client'

import { Bar, BarChart, CartesianGrid, LabelList, XAxis, Area, AreaChart } from 'recharts'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { format, isValid, setDefaultOptions } from 'date-fns'
import { es } from 'date-fns/locale'

setDefaultOptions({ locale: es })

const chartConfig = {
  amount: {
    label: 'Nº de accesos:',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig

export default function AreaGraph({ chartData, period }: any) {
  const formatDate = (value: string) => {
    const date = new Date(value)
    if (!isValid(date)) return value
    if (period === 'day') {
      return format(date, 'HH:mm')
    }
    if (period === 'week') {
      return format(date, 'EEE')
    } else {
      return format(date, 'd MMM')
    }
  }

  return (
    <ChartContainer config={chartConfig} className="aspect-auto h-full w-full">
      {period === 'day' || period === 'week' ? (
        <BarChart
          accessibilityLayer
          barGap={50}
          data={chartData}
          margin={{
            top: 22,
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            className="text-base capitalize"
            dataKey="date"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={formatDate}
          />
          <Bar dataKey="amount" radius={5} fill="var(--color-amount)" fillOpacity={1}>
            <LabelList position="top" offset={12} className="fill-foreground" fontSize={13} />
          </Bar>
        </BarChart>
      ) : (
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
            tickFormatter={formatDate}
          />
          <ChartTooltip
            cursor={true}
            content={
              <ChartTooltipContent
                labelFormatter={(value) => {
                  const date = new Date(value)
                  if (!isValid(date)) return value
                  return format(date, period === 'day' ? 'HH:mm' : 'eeee d/MM/y')
                }}
                labelClassName="capitalize"
                className="shadow-md shadow-black/65 min-w-40 text-sm p-3"
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
      )}
    </ChartContainer>
  )
}
