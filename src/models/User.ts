export interface User {
    uid: string;
    email: string;
    name: string;
    avatarUrl?: string;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface UserProfile extends User {
    level: number;
    name: string;
    xp: number;
    interests: string[];
    goals: string[];
    currentStreak: number;
    longestStreak: number;
    lastActiveAt: string;
    profession?: string;
    experienceLevel?: string;
  }

  export interface UserProgress {
    id: string;
    userId: string;
    contentId: string;
    progressPercentage: number;
    completed: boolean;
    lastAccessedAt: string;
  }
  
  export interface UserAchievement {
    id: string;
    userId: string;
    achievementId: string;
    unlockedAt: string;
  }