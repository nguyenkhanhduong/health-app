import type { FC } from 'react'
import { CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis } from 'recharts'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomTick: FC = ({ x, y, payload }: any) => {
  const text = payload.value
  const number = text.match(/\d+/)[0]
  const unit = text.replace(/\d+/, '')

  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={-2}
        textAnchor='middle'
        fill='#ffffff'
        className='font-inter'
      >
        <tspan fontSize='12'>{number}</tspan>
        <tspan
          className='font-light'
          dy='-1'
          fontSize='8'
        >
          {unit}
        </tspan>
      </text>
    </g>
  )
}
export const YearlyLineChart: FC = () => {
  const data = [
    { month: '6月', line1: 95, line2: 100 },
    { month: '7月', line1: 75, line2: 90 },
    { month: '8月', line1: 68, line2: 82 },
    { month: '9月', line1: 82, line2: 85 },
    { month: '10月', line1: 65, line2: 78 },
    { month: '11月', line1: 62, line2: 72 },
    { month: '12月', line1: 55, line2: 68 },
    { month: '1月', line1: 48, line2: 62 },
    { month: '2月', line1: 42, line2: 58 },
    { month: '3月', line1: 35, line2: 55 },
    { month: '4月', line1: 32, line2: 48 },
    { month: '5月', line1: 28, line2: 52 },
  ]

  return (
    <div className='bg-dark-600 h-full w-full flex-1 pr-[98px] pl-[53px]'>
      <ResponsiveContainer
        width='100%'
        height='100%'
      >
        <LineChart
          data={data}
          margin={{ top: 16, right: 12, left: 12, bottom: 12 }}
        >
          <CartesianGrid
            strokeDasharray='0'
            stroke='#777777'
            horizontal={false}
            vertical={true}
          />
          <XAxis
            dataKey='month'
            axisLine={false}
            tickLine={false}
            tickMargin={10}
            tick={<CustomTick />}
            interval={0}
          />
          <Line
            type='monotone'
            dataKey='line1'
            stroke='#8FE9D0'
            strokeWidth={3}
            dot={{ fill: '#8FE9D0', strokeWidth: 0, r: 4 }}
            activeDot={{ r: 6, fill: '#8FE9D0' }}
          />
          <Line
            type='monotone'
            dataKey='line2'
            stroke='#FFCC21'
            strokeWidth={3}
            dot={{ fill: '#FFCC21', strokeWidth: 0, r: 4 }}
            activeDot={{ r: 6, fill: '#FFCC21' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
