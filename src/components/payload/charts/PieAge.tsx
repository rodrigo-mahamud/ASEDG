'use client'
import * as React from 'react'
import { Label, Pie, PieChart } from 'recharts'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/lib/chart'
import { PieAgeProps } from '@/utils/dashboard/types'

const chartConfig = {
  edad: {
    label: 'Edad',
  },
  '15-20': { label: '15-20 años' },
  '20-30': { label: '20-30 años' },
  '30-40': { label: '30-40' },
  '40-50': { label: '40-50' },
  '50-60': { label: '50-60' },
  '60+': { label: '60+' },
} satisfies ChartConfig

export function PieAge({ data, average }: PieAgeProps) {
  console.log(data)

  const processedData = React.useMemo(() => {
    if (!data || !Array.isArray(data)) {
      return []
    }
    return data.map((item, index) => {
      const num = (index % 4) + 1
      return {
        ...item,
        fill: `hsl(var(--chart-${num}))`,
      }
    })
  }, [data])

  return (
    <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-80">
      <PieChart>
        <ChartTooltip
          cursor={true}
          content={
            <ChartTooltipContent
              labelClassName="capitalize mb-1"
              className="shadow-md shadow-black/65 min-w-40 text-sm p-3"
              labelKey="edad"
              nameKey="ages"
              indicator={'line'}
            />
          }
        />
        <Pie
          data={processedData}
          dataKey="amount"
          fillOpacity={0.9}
          nameKey="ages"
          innerRadius={90}
          outerRadius={110}
          strokeWidth={3}
        >
          <Label
            content={({ viewBox }) => {
              if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                return (
                  <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                    <tspan
                      x={viewBox.cx}
                      y={viewBox.cy}
                      className="fill-foreground text-4xl font-bold"
                    >
                      {average}
                    </tspan>
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) + 24}
                      className="fill-muted-foreground text-base"
                    >
                      Edad promedio
                    </tspan>
                  </text>
                )
              }
              return null
            }}
          />
        </Pie>
      </PieChart>
    </ChartContainer>
  )
}
