import dayjs from 'dayjs'
import type { FC } from 'react'
import { useId } from 'react'

import D01 from '@/assets/images/d01.jpg'
import D02 from '@/assets/images/d02.jpg'
import L01 from '@/assets/images/l01.jpg'
import L02 from '@/assets/images/l02.jpg'
import L03 from '@/assets/images/l03.jpg'
import M01 from '@/assets/images/m01.jpg'
import S01 from '@/assets/images/s01.jpg'

import { MealCard } from '@/pages/home/components/meal-gallery-item'
import { Button } from '@/shadcn/components/ui/button'

export const MealGallery: FC = () => {
  const mealData = [
    {
      id: useId(),
      date: new Date(),
      type: 'Morning',
      url: M01,
    },
    {
      id: useId(),
      date: new Date(),
      type: 'Lunch',
      url: L03,
    },
    {
      id: useId(),
      date: new Date(),
      type: 'Dinner',
      url: D01,
    },
    {
      id: useId(),
      date: new Date(),
      type: 'Snack',
      url: L01,
    },
    {
      id: useId(),
      date: new Date(),
      type: 'Morning',
      url: M01,
    },
    {
      id: useId(),
      date: new Date(),
      type: 'Lunch',
      url: L02,
    },
    {
      id: useId(),
      date: new Date(),
      type: 'Dinner',
      url: D02,
    },
    {
      id: useId(),
      date: new Date(),
      type: 'Snack',
      url: S01,
    },
  ]
  return (
    <section className='app-container flex flex-col gap-7 pb-13'>
      <div className='grid grid-cols-4 gap-2'>
        {mealData.map(meal => (
          <MealCard
            key={meal.id}
            date={dayjs(meal.date).format('MM.DD')}
            mealType={meal.type}
            imageUrl={meal.url}
          />
        ))}
      </div>
      <Button className='btn-gradient mx-auto h-14 w-74 text-[18px] leading-[26px]'>
        記録をもっと見る
      </Button>
    </section>
  )
}
