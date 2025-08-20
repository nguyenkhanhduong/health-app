import type { InfiniteData } from '@tanstack/react-query'
import { useInfiniteQuery } from '@tanstack/react-query'

import { getDiaries } from '@/services/record'
import type { Diary } from '@/types/diary'

const LIMIT = 8

export const useGetDiaries = () => {
  const { data, fetchNextPage, hasNextPage, isLoading, isFetching, refetch } = useInfiniteQuery<
    { data: Diary[]; total: number },
    Error,
    InfiniteData<{ data: Diary[]; total: number }, number>,
    readonly unknown[],
    number
  >({
    queryKey: ['diaries'],
    queryFn: async ({ pageParam }) => getDiaries(pageParam, LIMIT),
    getNextPageParam: (lastPage, allPages) => {
      const loaded = allPages.flatMap(p => p.data).length
      if (loaded < lastPage.total) {
        return allPages.length + 1
      }
      return undefined
    },
    initialPageParam: 1,
  })
  const diaries = data?.pages.flatMap(page => page.data) ?? []

  return {
    diaries,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetching,
    refetch,
  }
}
