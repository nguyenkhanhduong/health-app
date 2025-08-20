import dayjs from 'dayjs'
import type { FC } from 'react'
import { useRef, useState } from 'react'

import { MealCard } from '@/pages/home/components/meal-gallery-item'
import { MealSelector } from '@/pages/home/components/meal-selector'
import { useGetMeals } from '@/pages/home/hooks/use-get-meals'
import { Button } from '@/shadcn/components/ui/button'
import { Skeleton } from '@/shadcn/components/ui/skeleton'
import type { MealType } from '@/types'

export const MealGallery: FC = () => {
  const [typeSelected, setTypeSelected] = useState<MealType | undefined>()
  const { meals, fetchNextPage, hasNextPage, isFetching, isLoading } = useGetMeals(typeSelected)
  const bottomRef = useRef<HTMLDivElement>(null)
  const handleLoadMore = async () => {
    await fetchNextPage()
    setTimeout(() => {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }
  return (
    <section className='app-container flex flex-col pb-16'>
      <MealSelector
        type={typeSelected}
        onChange={setTypeSelected}
      />
      <div className='grid grid-cols-4 gap-2'>
        {meals.map(meal => (
          <MealCard
            key={meal.id}
            date={dayjs(meal.date).format('MM.DD')}
            mealType={meal.type}
            imageUrl={meal.url}
          />
        ))}
        {(isFetching || isLoading) &&
          Array.from({ length: 8 }).map((_, idx) => (
            <Skeleton
              key={`skeleton-${idx}`}
              className='bg-muted aspect-square h-[234px] w-full'
            />
          ))}
        <div ref={bottomRef} />
      </div>
      {hasNextPage && (
        <Button
          onClick={handleLoadMore}
          disabled={!hasNextPage}
          className='btn-gradient mx-auto cursor-pointer mt-5 h-14 w-74 text-[18px] leading-[26px]'
        >
          記録をもっと見る
        </Button>
      )}
    </section>
  )
}
