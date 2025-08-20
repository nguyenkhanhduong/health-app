import { useMemo } from 'react'

import type { IExercise } from '@/types/diary'

interface UseExerciseDataReturn {
  leftColumn: IExercise[]
  rightColumn: IExercise[]
}

export const useExerciseData = (exercises: IExercise[]): UseExerciseDataReturn =>
  useMemo(() => {
    const midPoint = Math.ceil(exercises.length / 2)
    const leftColumn = exercises.slice(0, midPoint)
    const rightColumn = exercises.slice(midPoint)

    return {
      leftColumn,
      rightColumn,
    }
  }, [exercises])
