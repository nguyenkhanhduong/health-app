import clsx from 'clsx'
import type { FC } from 'react'
import { useState } from 'react'
import { CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis } from 'recharts'

import { RecordCard } from '@/pages/record/components/record-card'
import { Badge } from '@/shadcn/components/ui/badge'

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
        className='font-inter tracking-[0px]'
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
export const RecordChart: FC = () => {
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
  const renderChart = () => (
    <ResponsiveContainer
      width='100%'
      height='100%'
    >
      <LineChart
        data={data}
        margin={{ top: 4, right: 50, left: 27, bottom: -8 }}
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
  )
  return (
    <section className='app-container mt-14 mb-14 h-76 w-full'>
      <RecordCard
        title='BODY RECORD'
        date='2021.05.21'
        className='pb-4'
      >
        {renderChart()}
        <FilterChart />
      </RecordCard>
    </section>
  )
}
type FilterType = 'd' | 'w' | 'm' | 'y'
const filterTypes: { title: string; value: FilterType }[] = [
  {
    value: 'd',
    title: '日',
  },
  {
    value: 'w',
    title: '週',
  },
  {
    value: 'm',
    title: '月',
  },
  {
    value: 'y',
    title: '年',
  },
]
const FilterChart = () => {
  const [filter, setFilter] = useState<FilterType>('y')
  return (
    <div className='flex gap-4 pl-2'>
      {filterTypes.map(f => (
        <Badge
          onClick={() => setFilter(f.value)}
          className={clsx(
            'text-primary-300 h-6 w-[56px] cursor-pointer rounded-[11px] bg-white tracking-[0.08px]',
            {
              ['bg-primary-300 text-white']: f.value === filter,
            },
          )}
          key={f.title}
        >
          {f.title}
        </Badge>
      ))}
    </div>
  )
}
