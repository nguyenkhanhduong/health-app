import type { FC } from 'react'
import { CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis } from 'recharts'
import { useGetYearlyData } from '../hooks/use-get-yearly-report'

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
  const { data } = useGetYearlyData()
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
