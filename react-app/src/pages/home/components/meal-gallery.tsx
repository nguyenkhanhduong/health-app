import dayjs from 'dayjs'
import type { FC } from 'react'

import { MealCard } from '@/pages/home/components/meal-gallery-item'
import { useGetMeals } from '@/pages/home/hooks/use-get-meals'
import { Button } from '@/shadcn/components/ui/button'
import { Skeleton } from '@/shadcn/components/ui/skeleton'

export const MealGallery: FC = () => {
  const { meals, fetchNextPage, hasNextPage, isFetching, isLoading } = useGetMeals()
  return (
    <section className='app-container flex flex-col gap-7 pb-13'>
      <div className='grid grid-cols-4 gap-2'>
        {meals.map(meal => (
          <MealCard
            key={meal.id}
            date={dayjs(meal.date).format('MM.DD')}
            mealType={meal.type}
            imageUrl={meal.url}
          />
        ))}
        {isFetching ||
          isLoading ||
          (!meals.length &&
            Array.from({ length: 8 }).map((_, idx) => (
              <Skeleton
                key={`skeleton-${idx}`}
                className='bg-muted aspect-square h-[234px] w-full'
              />
            )))}
      </div>
      <Button
        onClick={() => fetchNextPage()}
        disabled={!hasNextPage}
        className='btn-gradient mx-auto h-14 w-74 text-[18px] leading-[26px]'
      >
        記録をもっと見る
      </Button>
    </section>
  )
}
