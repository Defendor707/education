// Shared TypeScript types for all platforms

export interface Course {
  id: number;
  title: string;
  description: string;
  price: number;
  instructor: string;
  duration: number;
  level: 'beginner' | 'intermediate' | 'advanced';
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'student' | 'instructor' | 'admin';
  createdAt: string;
}

export interface Lesson {
  id: number;
  courseId: number;
  title: string;
  content: string;
  order: number;
  videoUrl?: string;
  duration: number;
}

export interface Enrollment {
  id: number;
  userId: number;
  courseId: number;
  progress: number;
  completed: boolean;
  enrolledAt: string;
}

