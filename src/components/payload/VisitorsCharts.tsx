'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/lib/card'

import AreaGraph from './charts/AreaGraph'

export default function VisitorsCharts(data) {
  //   const total = useMemo(
  //     () => ({
  //       amount: chartData.reduce((acc, curr) => acc + curr.amount, 0),
  //     }),
  //     [chartData],
  //   )

  return (
    <Card className={'h-full relative border border-white/15'}>
      <CardHeader className="flex h-1/4 flex-col items-stretch space-y-0 border-b border-border p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-evenly px-6 py-5 sm:py-6">
          <CardTitle>Visitantes hoy</CardTitle>
          <CardDescription>Showing total visitors for the last 3 months</CardDescription>
        </div>
        <div className="flex">
          {/* {['amount'].map((key) => {
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
          })} */}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6 h-3/4">
        <AreaGraph chartData={data} />
      </CardContent>
    </Card>
  )
}
