'use client'

import * as React from 'react'
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts'
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/lib/chart'
import { format, isValid } from 'date-fns'

const chartConfig = {
  revenue: {
    label: 'Ingresos',
    color: 'hsl(var(--chart-2))',
  },
  amount: {
    label: 'Usuarios',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig

export default function AreaRevenue({ period, chartData }: any) {
  return (
    <>
      <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
        <AreaChart
          data={chartData}
          className="max-w-none"
          margin={{
            top: 15,
            right: -30,
            left: -40,
            bottom: 5,
          }}
        >
          <defs>
            <linearGradient id="fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--color-amount)" stopOpacity={1} />
              <stop offset="95%" stopColor="var(--color-amount)" stopOpacity={0.1} />
            </linearGradient>
            <linearGradient id="fillrevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--color-revenue)" stopOpacity={0.8} />
              <stop offset="95%" stopColor="var(--color-revenue)" stopOpacity={0.1} />
            </linearGradient>
          </defs>
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
          <YAxis yAxisId="left" />
          <YAxis yAxisId="right" orientation="right" />
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
          <Area
            dataKey="revenue"
            yAxisId="right"
            type="bump"
            fill="url(#fillrevenue)"
            stroke="var(--color-revenue)"
          />
          <Area
            dataKey="amount"
            yAxisId="left"
            type="bump"
            fill="url(#fill)"
            stroke="var(--color-amount)"
          />
        </AreaChart>
      </ChartContainer>
    </>
  )
}
