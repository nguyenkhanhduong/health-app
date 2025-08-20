import clsx from 'clsx'
import dayjs from 'dayjs'
import type { FC } from 'react'
import { useMemo, useState } from 'react'
import { CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis } from 'recharts'

import { RecordCard } from '@/pages/record/components/record-card'
import { useGetBodyReport } from '@/pages/record/hooks/use-body-report'
import { Badge } from '@/shadcn/components/ui/badge'

type DateType = 'd' | 'w' | 'm' | 'y'
type FilterItem = { title: string; value: DateType }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomTick: FC = ({ x, y, payload }: any) => {
  const text = payload.value

  const number = text.match(/\d+/)?.[0]
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
        {number && <tspan fontSize='12'>{number}</tspan>}
        <tspan
          className='font-light'
          dy='-1'
          fontSize={number ? '8' : '12'}
        >
          {unit}
        </tspan>
      </text>
    </g>
  )
}
export const RecordChart: FC = () => {
  const [dateType, setDateTypeSelected] = useState<DateType>('y')
  const { data: reportData } = useGetBodyReport()
  const data = useMemo(() => reportData?.[dateType] ?? [], [dateType, reportData])

  const renderChart = () => (
    <div className='h-full w-full'>
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
            dataKey='time'
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
  return (
    <section className='app-container mt-14 mb-14 h-76 w-full'>
      <RecordCard
        title='BODY RECORD'
        date={dayjs(new Date()).format('YYYY.MM.DD')}
        className='pb-4'
      >
        {renderChart()}
        <FilterChart
          dateType={dateType}
          onChange={setDateTypeSelected}
        />
      </RecordCard>
    </section>
  )
}

const filterTypes: FilterItem[] = [
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
const FilterChart: FC<{ dateType: DateType; onChange: (f: DateType) => void }> = ({
  dateType,
  onChange,
}) => (
  <div className='flex gap-4 pl-2'>
    {filterTypes.map(f => (
      <Badge
        onClick={() => onChange(f.value)}
        className={clsx(
          'text-primary-300 h-6 w-[56px] cursor-pointer rounded-[11px] bg-white tracking-[0.08px]',
          {
            ['bg-primary-300 text-white']: f.value === dateType,
          },
        )}
        key={f.title}
      >
        {f.title}
      </Badge>
    ))}
  </div>
)
