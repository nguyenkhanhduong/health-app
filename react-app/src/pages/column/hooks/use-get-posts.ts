import type { InfiniteData } from '@tanstack/react-query'
import { useInfiniteQuery } from '@tanstack/react-query'

import { getPosts } from '@/services/record'
import type { Post } from '@/types/column'

const LIMIT = 8

export const useGetPosts = () => {
  const { data, fetchNextPage, hasNextPage, isLoading, isFetching, refetch } = useInfiniteQuery<
    { data: Post[]; total: number },
    Error,
    InfiniteData<{ data: Post[]; total: number }, number>,
    readonly unknown[],
    number
  >({
    queryKey: ['posts'],
    queryFn: async ({ pageParam }) => getPosts(pageParam, LIMIT),
    getNextPageParam: (lastPage, allPages) => {
      const loaded = allPages.flatMap(p => p.data).length
      if (loaded < lastPage.total) {
        return allPages.length + 1
      }
      return undefined
    },
    initialPageParam: 1,
  })
  const posts = data?.pages.flatMap(page => page.data) ?? []

  return {
    posts,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetching,
    refetch,
  }
}
