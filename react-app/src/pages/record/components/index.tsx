import type { FC } from 'react'

import { Diary } from '@/pages/record/components/diary'
import { Exercise } from '@/pages/record/components/exercise'
import { RecordCategories } from '@/pages/record/components/record-categories'
import { RecordChart } from '@/pages/record/components/record-chart'

export const RecordPage: FC = () => (
  <div className='flex flex-col pb-12'>
    <RecordCategories />
    <RecordChart />
    <Exercise />
    <Diary />
  </div>
)
