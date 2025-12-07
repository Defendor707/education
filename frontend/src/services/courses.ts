import axios from 'axios';
import { getToken } from './auth';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

const getAuthHeaders = () => {
  const token = getToken();
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// Course Types
export interface Course {
  id: number;
  title: string;
  description: string;
  instructor_id: number;
  status: string;
  price: number;
  created_at: string;
  updated_at?: string;
}

export interface Lesson {
  id: number;
  course_id: number;
  title: string;
  content: string;
  video_url?: string;
  order: number;
  duration: number;
  created_at: string;
}

export interface Test {
  id: number;
  lesson_id: number;
  title: string;
  description?: string;
  time_limit: number;
  passing_score: number;
  created_at: string;
}

export interface Question {
  id: number;
  test_id: number;
  question_text: string;
  question_type: string;
  points: number;
  order: number;
  options: QuestionOption[];
}

export interface QuestionOption {
  id: number;
  question_id: number;
  option_text: string;
  is_correct: boolean;
  order: number;
}

// Course API
export const getCourses = async (): Promise<Course[]> => {
  const response = await axios.get(`${API_URL}/courses`, getAuthHeaders());
  return response.data;
};

export const getMyCourses = async (): Promise<Course[]> => {
  const response = await axios.get(`${API_URL}/courses/my-courses`, getAuthHeaders());
  return response.data;
};

export const getCourse = async (courseId: number): Promise<Course> => {
  const response = await axios.get(`${API_URL}/courses/${courseId}`, getAuthHeaders());
  return response.data;
};

export const createCourse = async (course: {
  title: string;
  description?: string;
  price: number;
}): Promise<Course> => {
  const response = await axios.post(`${API_URL}/courses`, course, getAuthHeaders());
  return response.data;
};

export const enrollCourse = async (courseId: number): Promise<any> => {
  const response = await axios.post(
    `${API_URL}/courses/${courseId}/enroll`,
    {},
    getAuthHeaders()
  );
  return response.data;
};

// Lesson API
export const getLessons = async (courseId: number): Promise<Lesson[]> => {
  const response = await axios.get(
    `${API_URL}/courses/courses/${courseId}/lessons`,
    getAuthHeaders()
  );
  return response.data;
};

export const createLesson = async (lesson: {
  course_id: number;
  title: string;
  content?: string;
  video_url?: string;
  order: number;
  duration: number;
}): Promise<Lesson> => {
  const response = await axios.post(`${API_URL}/courses/lessons`, lesson, getAuthHeaders());
  return response.data;
};

// Test API
export const getTest = async (testId: number): Promise<Test> => {
  const response = await axios.get(`${API_URL}/courses/tests/${testId}`, getAuthHeaders());
  return response.data;
};

export const getTestQuestions = async (testId: number): Promise<Question[]> => {
  const response = await axios.get(
    `${API_URL}/courses/tests/${testId}/questions`,
    getAuthHeaders()
  );
  return response.data;
};

export const createTest = async (test: {
  lesson_id: number;
  title: string;
  description?: string;
  time_limit: number;
  passing_score: number;
}): Promise<Test> => {
  const response = await axios.post(`${API_URL}/courses/tests`, test, getAuthHeaders());
  return response.data;
};

export const createQuestion = async (
  testId: number,
  question: {
    question_text: string;
    question_type: string;
    points: number;
    order: number;
    options: Array<{
      option_text: string;
      is_correct: boolean;
      order: number;
    }>;
  }
): Promise<Question> => {
  const response = await axios.post(
    `${API_URL}/courses/tests/${testId}/questions`,
    question,
    getAuthHeaders()
  );
  return response.data;
};

export const submitTestAttempt = async (
  testId: number,
  answers: Array<{
    question_id: number;
    answer_text?: string;
    option_id?: number;
  }>
): Promise<any> => {
  const response = await axios.post(
    `${API_URL}/courses/tests/${testId}/attempt`,
    { answers },
    getAuthHeaders()
  );
  return response.data;
};

