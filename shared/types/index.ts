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
  first_name: string;
  last_name: string;
  role: 'student' | 'instructor' | 'admin';
  is_active: boolean;
  created_at: string;
}

export interface SignUpData {
  username: string;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
}

export interface SignInData {
  username: string;
  password: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
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

