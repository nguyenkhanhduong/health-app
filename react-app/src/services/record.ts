import { httpClient } from '@/helper/http-client'
import type { BodyReport, ResponseWithPagination } from '@/types'
import type { Post } from '@/types/column'
import type { Diary, IExercise } from '@/types/diary'

export const getBodyReport = async (): Promise<BodyReport> => {
  const res = await httpClient.get<BodyReport>('/body-report')
  return res.data
}

export const getExercises = async (): Promise<IExercise[]> => {
  const res = await httpClient.get<IExercise[]>('/exercises')
  return res.data
}

export const getDiaries = async (page = 1, limit = 8): Promise<ResponseWithPagination<Diary[]>> => {
  const response = await httpClient.get<ResponseWithPagination<Diary[]>>('/diaries', {
    params: { _page: page, _limit: limit },
  })
  return response.data
}

export const getPosts = async (page = 1, limit = 8): Promise<ResponseWithPagination<Post[]>> => {
  const response = await httpClient.get<ResponseWithPagination<Post[]>>('/post', {
    params: { _page: page, _limit: limit },
  })
  return response.data
}
