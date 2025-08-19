export interface IExercise {
  id: string
  name: string
  duration: number
  calories: number
}

export interface ExerciseSession {
  date: Date
  exercises: IExercise[]
}
