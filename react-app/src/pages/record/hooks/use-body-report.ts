import { useQuery } from '@tanstack/react-query'

import { getBodyReport } from '@/services/record'

export const useGetBodyReport = () => {
  const { data, isLoading, refetch, isFetching } = useQuery({
    queryKey: ['bodyReport'],
    queryFn: async () => await getBodyReport(),
    staleTime: 0,
  })

  return {
    data,
    isLoading,
    isFetching,
    refetch,
  }
}
