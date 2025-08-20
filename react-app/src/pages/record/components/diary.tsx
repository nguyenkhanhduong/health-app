import dayjs from 'dayjs'
import { useRef } from 'react'

import { useGetDiaries } from '@/pages/record/hooks/use-get-diaries'
import { Button } from '@/shadcn/components/ui/button'
import { Skeleton } from '@/shadcn/components/ui/skeleton'

export const Diary = () => {
  const { diaries, isFetching, hasNextPage, fetchNextPage, isLoading } = useGetDiaries()
  const bottomRef = useRef<HTMLDivElement>(null)
  const handleLoadMore = async () => {
    await fetchNextPage()
    setTimeout(() => {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }
  return (
    <section className='app-container'>
      <div className='flex w-full flex-col'>
        <h3 className='font-inter text-dark-500 text-[22px] leading-[27px]'>MY DIARY</h3>
        <div className='text-dark-500 flex flex-wrap gap-3'>
          {diaries.map((i, index) => (
            <div
              key={index}
              className='flex h-[231px] w-[231px] flex-col gap-2 border-2 border-gray-400 p-4'
            >
              <span className='font-inter w-[147px] text-[18px] leading-[22px] tracking-[0.09px] whitespace-pre-line'>
                {dayjs(i.date).format('YYYY.MM.DD\nHH:mm')}
              </span>
              <div className='h-33 text-xs leading-[17px] tracking-[0.06px]'>
                <p>{i.title}</p>
                <p className='line-clamp-5 overflow-hidden break-all text-ellipsis'>
                  {i.des.slice(0, 72)}...
                </p>
              </div>
            </div>
          ))}
          {(isFetching || isLoading) &&
            Array.from({ length: 8 }).map((_, idx) => (
              <Skeleton
                key={`skeleton-${idx}`}
                className='bg-muted aspect-square h-[231px] w-[231px]'
              />
            ))}
          <div ref={bottomRef} />
        </div>
        {hasNextPage && (
          <Button
            disabled={!hasNextPage}
            onClick={handleLoadMore}
            className='btn-gradient mx-auto mt-6 h-14 w-74 text-[18px] leading-[26px]'
          >
            自分の日記をもっと見る
          </Button>
        )}
      </div>
    </section>
  )
}
