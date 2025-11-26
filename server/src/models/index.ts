// Export models here
// Example:
// export * from './user.model';
// export * from './health.model';

export interface Meal {
  id: number;
  name: string;
  calories: number;
  date: string;
}

export interface Exercise {
  id: number;
  name: string;
  duration: number;
  calories: number;
  date: string;
}

export interface Diary {
  id: number;
  title: string;
  content: string;
  date: string;
}
