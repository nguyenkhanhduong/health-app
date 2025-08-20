import { useQuery } from '@tanstack/react-query'

import { getYearlyChartData } from '@/services/home'

export const useGetYearlyData = () => {
  const { data, isLoading, refetch, isFetching } = useQuery({
    queryKey: ['yearlyReport'],
    queryFn: async () => await getYearlyChartData(),
    staleTime: 0,
  })

  return {
    data: data ?? [],
    isLoading,
    isFetching,
    refetch,
  }
}
