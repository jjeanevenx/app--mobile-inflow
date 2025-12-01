import { Lesson } from "./Lesson";

export interface Module {
    id: string;
    title: string;
    lessons: Lesson[];
    completedLessons: number;
    totalLessons: number;
  }