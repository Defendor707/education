// Shared constants

export const APP_NAME = 'Education Platform';
export const APP_VERSION = '1.0.0';

export const API_ENDPOINTS = {
  COURSES: '/courses',
  USERS: '/users',
  AUTH: '/auth',
  ENROLLMENTS: '/enrollments',
  LESSONS: '/lessons',
} as const;

export const USER_ROLES = {
  STUDENT: 'student',
  INSTRUCTOR: 'instructor',
  ADMIN: 'admin',
} as const;

