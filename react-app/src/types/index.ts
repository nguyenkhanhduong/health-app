export type MealType = 'Morning' | 'Lunch' | 'Dinner' | 'Snack'

export interface Meal {
  id: string
  date: Date | string
  type: MealType
  url: string
}
export type ChartLineData = {
  id: string
  time: string
  line1: number
  line2: number
}
export interface ResponseWithPagination<T> {
  data: T
  total: number
}
export interface BodyReport {
  y: ChartLineData[]
  m: ChartLineData[]
  w: ChartLineData[]
  d: ChartLineData[]
}
