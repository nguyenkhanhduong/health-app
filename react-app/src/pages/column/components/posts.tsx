import dayjs from 'dayjs'
import { useRef } from 'react'

import { useGetPosts } from '@/pages/column/hooks/use-get-posts'
import { Button } from '@/shadcn/components/ui/button'
import { Skeleton } from '@/shadcn/components/ui/skeleton'

export const Posts = () => {
  const { posts, fetchNextPage, hasNextPage, isFetching, isLoading } = useGetPosts()
  const bottomRef = useRef<HTMLDivElement>(null)
  const handleLoadMore = async () => {
    await fetchNextPage()
    setTimeout(() => {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }
  return (
    <section className='app-container mt-14 mb-16 flex flex-col'>
      <div className='flex flex-wrap gap-2'>
        {posts.map(item => (
          <div
            key={item.id}
            className='group flex h-55.5 w-[234px] flex-col'
          >
            <div className='relative h-36 w-full overflow-hidden'>
              <img
                src={item.url}
                className='object-cover transition-transform duration-300 ease-in-out group-hover:scale-110'
                alt={item.title}
              />
              <div className='bg-primary-300 font-inter absolute bottom-0 left-0 flex h-6 w-36 items-center px-2 text-[15px] leading-[30px] text-white'>
                {dayjs(item.date).format('YYYY.MM.DD  HH:mm')}
              </div>
            </div>
            <span className='text-dark-500 mt-[5px] line-clamp-2 overflow-hidden text-[15px] leading-[22px] font-light tracking-[0.08px] break-all text-ellipsis'>
              {item.title}
            </span>
            <div className='text-sx text-primary-400 flex gap-2 leading-[22px]'>
              {item.tags.map(t => (
                <span key={t}>{t}</span>
              ))}
            </div>
          </div>
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
          className='btn-gradient mx-auto cursor-pointer mt-4 h-14 w-74 text-[18px] leading-[26px]'
        >
          コラムをもっと見る
        </Button>
      )}
    </section>
  )
}
