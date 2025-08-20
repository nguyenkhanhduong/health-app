export type MealType = 'Morning' | 'Lunch' | 'Dinner' | 'Snack'

export interface Meal {
  id: string
  date: Date | string
  type: MealType
  url: string
}
export type ChartLineData = {
  month: string 
  line1: number
  line2: number
}
export interface Response<T> {
  data: T
  total: number
}
