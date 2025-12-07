"""
Pydantic schemas for courses, lessons, and tests
"""
from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime

# Course Schemas
class CourseBase(BaseModel):
    title: str = Field(..., min_length=1, max_length=200)
    description: Optional[str] = None
    price: float = Field(default=0.0, ge=0)

class CourseCreate(CourseBase):
    pass

class CourseUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    status: Optional[str] = None
    price: Optional[float] = None

class CourseResponse(CourseBase):
    id: int
    instructor_id: int
    status: str
    created_at: datetime
    updated_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True

# Lesson Schemas
class LessonBase(BaseModel):
    title: str = Field(..., min_length=1, max_length=200)
    content: Optional[str] = None
    video_url: Optional[str] = None
    order: int = Field(default=0, ge=0)
    duration: int = Field(default=0, ge=0)

class LessonCreate(LessonBase):
    course_id: int

class LessonUpdate(BaseModel):
    title: Optional[str] = None
    content: Optional[str] = None
    video_url: Optional[str] = None
    order: Optional[int] = None
    duration: Optional[int] = None

class LessonResponse(LessonBase):
    id: int
    course_id: int
    created_at: datetime
    updated_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True

# Test Schemas
class TestBase(BaseModel):
    title: str = Field(..., min_length=1, max_length=200)
    description: Optional[str] = None
    time_limit: int = Field(default=30, ge=1)
    passing_score: int = Field(default=60, ge=0, le=100)

class TestCreate(TestBase):
    lesson_id: int

class TestUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    time_limit: Optional[int] = None
    passing_score: Optional[int] = None

class TestResponse(TestBase):
    id: int
    lesson_id: int
    created_at: datetime
    updated_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True

# Question Schemas
class QuestionOptionBase(BaseModel):
    option_text: str
    is_correct: bool = False
    order: int = 0

class QuestionOptionCreate(QuestionOptionBase):
    pass

class QuestionOptionResponse(QuestionOptionBase):
    id: int
    
    class Config:
        from_attributes = True

class QuestionBase(BaseModel):
    question_text: str
    question_type: str = "multiple_choice"
    points: int = Field(default=1, ge=1)
    order: int = 0

class QuestionCreate(QuestionBase):
    test_id: int
    options: List[QuestionOptionCreate] = []

class QuestionUpdate(BaseModel):
    question_text: Optional[str] = None
    question_type: Optional[str] = None
    points: Optional[int] = None
    order: Optional[int] = None

class QuestionResponse(QuestionBase):
    id: int
    test_id: int
    options: List[QuestionOptionResponse] = []
    created_at: datetime
    
    class Config:
        from_attributes = True

# Test Attempt Schemas
class TestAnswerCreate(BaseModel):
    question_id: int
    answer_text: Optional[str] = None
    option_id: Optional[int] = None

class TestAttemptCreate(BaseModel):
    test_id: int
    answers: List[TestAnswerCreate] = []

class TestAttemptResponse(BaseModel):
    id: int
    user_id: int
    test_id: int
    score: float
    passed: bool
    started_at: datetime
    completed_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True

# Enrollment Schemas
class EnrollmentResponse(BaseModel):
    id: int
    user_id: int
    course_id: int
    progress: int
    completed: bool
    enrolled_at: datetime
    completed_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True

