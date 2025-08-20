import { httpClient } from '@/helper/http-client'
import type { ChartLineData, Meal,Response } from '@/types'


export const getMeals = async (page = 1, limit = 8): Promise<Response<Meal[]>> => {
  const res = await httpClient.get<Response<Meal[]>>('/meals', {
    params: { _page: page, _limit: limit },
  })
  return res.data
  
}

export const getYearlyChartData= async (): Promise<ChartLineData[]> => {
  const res = await httpClient.get<ChartLineData[]>('/yearly-report')

  return res.data
  
}
