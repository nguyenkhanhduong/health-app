import { useQuery } from '@tanstack/react-query'

import { getExercises } from '@/services/record'

export const useGetExercises = () => {
  const { data, isLoading, refetch, isFetching } = useQuery({
    queryKey: ['exercises'],
    queryFn: getExercises,
  })

  return {
    data: data ?? [],
    isLoading,
    isFetching,
    refetch,
  }
}
