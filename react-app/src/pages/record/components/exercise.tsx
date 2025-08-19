import type { FC } from 'react'

import { RecordCard } from '@/pages/record/components/record-card'
import { useExerciseData } from '@/pages/record/hooks/use-exercise-data'
import type { IExercise } from '@/pages/record/types/exercise'

const exercises: IExercise[] = [
  {
    id: Math.random() + '',
    name: '家事全般（立位・軽い）',
    duration: 10,
    calories: 26,
  },
  {
    id: Math.random() + '',
    name: '家事全般（立位・軽い）',
    duration: 10,
    calories: 26,
  },
  {
    id: Math.random() + '',
    name: '家事全般（立位・軽い）',
    duration: 10,
    calories: 26,
  },
  {
    id: Math.random() + '',
    name: '家事全般（立位・軽い）',
    duration: 10,
    calories: 26,
  },
  {
    id: Math.random() + '',
    name: '家事全般（立位・軽い）',
    duration: 10,
    calories: 26,
  },
  {
    id: Math.random() + '',
    name: '家事全般（立位・軽い）',
    duration: 10,
    calories: 26,
  },
  {
    id: Math.random() + '',
    name: '家事全般（立位・軽い）',
    duration: 10,
    calories: 26,
  },
  {
    id: Math.random() + '',
    name: '家事全般（立位・軽い）',
    duration: 10,
    calories: 26,
  },
  {
    id: Math.random() + '',
    name: '家事全般（立位・軽い）',
    duration: 10,
    calories: 26,
  },
  {
    id: Math.random() + '',
    name: '家事全般（立位・軽い）',
    duration: 10,
    calories: 26,
  },
  {
    id: Math.random() + '',
    name: '家事全般（立位・軽い）',
    duration: 10,
    calories: 26,
  },
  {
    id: Math.random() + '',
    name: '家事全般（立位・軽い）',
    duration: 10,
    calories: 26,
  },
  {
    id: Math.random() + '',
    name: '家事全般（立位・軽い）',
    duration: 10,
    calories: 26,
  },
  {
    id: Math.random() + '',
    name: '家事全般（立位・軽い）',
    duration: 10,
    calories: 26,
  },
  {
    id: Math.random() + '',
    name: '家事全般（立位・軽い）',
    duration: 10,
    calories: 26,
  },
  {
    id: Math.random() + '',
    name: '家事全般（立位・軽い）',
    duration: 10,
    calories: 26,
  },
]

export const Exercise = () => {
  const { leftColumn, rightColumn } = useExerciseData(exercises)
  return (
    <section className='app-container mb-14 h-66 w-full'>
      <RecordCard
        title='MY EXERCISE'
        date='2021.05.21'
        className='px-6 py-4'
      >
        <div className='custom-scrollbar mt-1 max-h-80 overflow-y-auto pr-6'>
          <div className='grid grid-cols-2 gap-10'>
            <ul className='list-disc space-y-2 divide-y divide-gray-600'>
              {leftColumn.map((exercise, i) => (
                <ExerciseItem
                  key={i}
                  exercise={exercise}
                />
              ))}
            </ul>
            <ul className='list-disc space-y-2 divide-y divide-gray-600'>
              {rightColumn.map((exercise, i) => (
                <ExerciseItem
                  key={i}
                  exercise={exercise}
                />
              ))}
            </ul>
          </div>
        </div>
      </RecordCard>
    </section>
  )
}

interface ExerciseItemProps {
  exercise: IExercise
}

const ExerciseItem: FC<ExerciseItemProps> = ({ exercise }) => (
  <li className='flex justify-between before:mr-[3px] before:self-start before:text-[5px] before:leading-[17px] before:text-white before:content-["●"]'>
    <div className='flex flex-1 flex-col text-[15px] tracking-[0.08px]'>
      <span className='leading-[22px] font-light text-white'>{exercise.name}</span>
      <span className='text-primary-300 font-inter leading-[18px]'>{exercise.calories}kcal</span>
    </div>
    <span className='text-primary-300 font-inter tracking-[0.09 px] ml-4 text-[18px] leading-[22px] font-medium'>
      {exercise.duration} min
    </span>
  </li>
)
