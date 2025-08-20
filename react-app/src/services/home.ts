import { httpClient } from '@/helper/http-client'
import type { ChartLineData, Meal, ResponseWithPagination } from '@/types'

export const getMeals = async (
  type?: string,
  page = 1,
  limit = 8,
): Promise<ResponseWithPagination<Meal[]>> => {
  const res = await httpClient.get<ResponseWithPagination<Meal[]>>('/meals', {
    params: { _page: page, _limit: limit, type },
  })
  return res.data
}

export const getYearlyChartData = async (): Promise<ChartLineData[]> => {
  const res = await httpClient.get<ChartLineData[]>('/yearly-report')
  return res.data
}
