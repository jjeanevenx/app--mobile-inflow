export interface LearningPath {
    id: string;
    completed: boolean;
    title: string;
    goal: string;
    description: string;
    moduleCount: number;
    totalHours: number;
    difficulty: string;
    modules: LearningPathModule[];
  }
  
  
  export interface LearningPathModule {
    id: string;
    title: string;
    order: number;
    completed: boolean;
    description: string;
    lessonCount: number;
    totalHours: number;
    difficulty: string;
    lessons: Lesson[];
  }
  
  
  export interface Lesson {
    id: string;
    order: number;
    title: string;
    url: string;
    duration: string;
    summary: string;
    author: string;
    category: string;
    completed: boolean;
  }