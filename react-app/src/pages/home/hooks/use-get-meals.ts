import type { InfiniteData } from '@tanstack/react-query'
import { useInfiniteQuery } from '@tanstack/react-query'

import { getMeals } from '@/services/home'
import type { Meal, ResponseWithPagination } from '@/types'

const LIMIT = 8

export const useGetMeals = (type?: string) => {
  const { data, fetchNextPage, hasNextPage, isLoading, isFetching, refetch } = useInfiniteQuery<
    ResponseWithPagination<Meal[]>,
    Error,
    InfiniteData<{ data: Meal[]; total: number }, number>,
    readonly unknown[],
    number
  >({
    queryKey: ['meals', type],
    queryFn: async ({ pageParam }) => getMeals(type, pageParam, LIMIT),
    getNextPageParam: (lastPage, allPages) => {
      const loaded = allPages.flatMap(p => p.data).length
      if (loaded < lastPage.total) {
        return allPages.length + 1
      }
      return undefined
    },
    initialPageParam: 1,
  })
  const meals = data?.pages.flatMap(page => page.data) ?? []

  return {
    meals,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetching,
    refetch,
  }
}
