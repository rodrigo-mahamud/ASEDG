// src/types/recharts.d.ts

import * as React from 'react'

declare module 'recharts' {
  export interface CommonProps {
    className?: string
    children?: React.ReactNode
  }

  export interface ChartProps extends CommonProps {
    data?: any[]
    margin?: {
      top?: number
      right?: number
      bottom?: number
      left?: number
    }
    accessibilityLayer?: boolean
  }

  export interface BarChartProps extends ChartProps {
    barGap?: number
  }

  export interface AreaChartProps extends ChartProps {}

  export interface RadarChartProps extends ChartProps {}

  export interface PieChartProps extends CommonProps {}

  export class BarChart extends React.Component<BarChartProps> {}
  export class AreaChart extends React.Component<AreaChartProps> {}
  export class RadarChart extends React.Component<RadarChartProps> {}
  export class PieChart extends React.Component<PieChartProps> {}

  export interface AxisProps extends CommonProps {
    dataKey?: string
    tickLine?: boolean
    axisLine?: boolean
    tickMargin?: number
    minTickGap?: number
    tickFormatter?: (value: any) => string
  }

  export interface XAxisProps extends AxisProps {}
  export interface YAxisProps extends AxisProps {
    yAxisId?: string | number
    orientation?: 'left' | 'right'
  }

  export class XAxis extends React.Component<XAxisProps> {}
  export class YAxis extends React.Component<YAxisProps> {}

  export interface CartesianGridProps {
    vertical?: boolean
    horizontal?: boolean
  }

  export class CartesianGrid extends React.Component<CartesianGridProps> {}

  export interface BarProps extends CommonProps {
    dataKey: string
    radius?: number | [number, number, number, number]
    fill?: string
    fillOpacity?: number
    stroke?: string
    strokeWidth?: number
    yAxisId?: string | number
  }

  export class Bar extends React.Component<BarProps> {}

  export interface AreaProps extends CommonProps {
    dataKey: string
    type?: 'monotone' | 'bump'
    fill?: string
    fillOpacity?: number
    stroke?: string
    strokeWidth?: number
    stackId?: string
    yAxisId?: string | number
  }

  export class Area extends React.Component<AreaProps> {}

  export interface LabelListProps {
    dataKey?: string
    position?: 'top' | 'bottom' | 'left' | 'right' | 'inside' | 'outside'
    offset?: number
    className?: string
    fontSize?: number
  }

  export class LabelList extends React.Component<LabelListProps> {}

  export interface TooltipProps extends CommonProps {
    content?: React.ReactElement | ((props: any) => React.ReactNode)
    cursor?: boolean | React.ReactElement
    labelFormatter?: (value: any) => React.ReactNode
    labelClassName?: string
    indicator?: 'line' | 'circle'
  }

  export class Tooltip extends React.Component<TooltipProps> {}

  export interface LegendProps extends CommonProps {
    content?: React.ReactElement
    payload?: Array<{ value: string; type: string; color: string }>
    verticalAlign?: 'top' | 'middle' | 'bottom'
  }

  export class Legend extends React.Component<LegendProps> {}

  export interface PolarAngleAxisProps {
    dataKey: string
  }

  export class PolarAngleAxis extends React.Component<PolarAngleAxisProps> {}

  export interface PolarGridProps {}

  export class PolarGrid extends React.Component<PolarGridProps> {}

  export interface RadarProps {
    dataKey: string
    fill?: string
    fillOpacity?: number
  }

  export class Radar extends React.Component<RadarProps> {}

  export interface PieProps extends CommonProps {
    data?: any[]
    dataKey: string
    nameKey?: string
    cx?: string | number
    cy?: string | number
    innerRadius?: number
    outerRadius?: number
    fill?: string
    fillOpacity?: number
    strokeWidth?: number
  }

  export class Pie extends React.Component<PieProps> {}

  export interface LabelProps {
    content?: React.ReactElement | ((props: any) => React.ReactNode)
  }

  export class Label extends React.Component<LabelProps> {}
}
