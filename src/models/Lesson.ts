import { LessonType } from "../types/LessonType";

export interface Lesson {
    id: string;
    title: string;
    type: LessonType;
    description: string;
    image: string;
    videoUrl: string;
    duration: string;
    completed: boolean;
  }