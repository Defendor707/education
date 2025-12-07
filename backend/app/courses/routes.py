"""
Courses routes - Teacher and Student endpoints
"""
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.auth.routes import get_current_user
from app.auth.models import User, UserRole
from app.courses import schemas
from app.courses.models import (
    Course, Lesson, Test, Question, QuestionOption,
    Enrollment, TestAttempt, TestAnswer, CourseStatus
)

router = APIRouter()

# ========== COURSE ROUTES ==========

@router.post("/", response_model=schemas.CourseResponse, status_code=status.HTTP_201_CREATED)
async def create_course(
    course: schemas.CourseCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Teacher: Create new course"""
    if current_user.role != UserRole.INSTRUCTOR:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only instructors can create courses"
        )
    
    new_course = Course(
        title=course.title,
        description=course.description,
        instructor_id=current_user.id,
        price=course.price,
        status=CourseStatus.DRAFT
    )
    
    db.add(new_course)
    db.commit()
    db.refresh(new_course)
    
    return new_course

@router.get("/", response_model=List[schemas.CourseResponse])
async def get_courses(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get all courses (published for students, all for instructors)"""
    if current_user.role == UserRole.INSTRUCTOR:
        courses = db.query(Course).filter(Course.instructor_id == current_user.id).all()
    else:
        courses = db.query(Course).filter(Course.status == CourseStatus.PUBLISHED).all()
    
    return courses

@router.get("/my-courses", response_model=List[schemas.CourseResponse])
async def get_my_courses(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get my enrolled courses (students) or created courses (instructors)"""
    if current_user.role == UserRole.INSTRUCTOR:
        courses = db.query(Course).filter(Course.instructor_id == current_user.id).all()
    else:
        enrollments = db.query(Enrollment).filter(Enrollment.user_id == current_user.id).all()
        courses = [enrollment.course for enrollment in enrollments]
    
    return courses

@router.get("/{course_id}", response_model=schemas.CourseResponse)
async def get_course(
    course_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get course by ID"""
    course = db.query(Course).filter(Course.id == course_id).first()
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    
    # Check access
    if course.status != CourseStatus.PUBLISHED and course.instructor_id != current_user.id:
        raise HTTPException(status_code=403, detail="Access denied")
    
    return course

@router.put("/{course_id}", response_model=schemas.CourseResponse)
async def update_course(
    course_id: int,
    course_update: schemas.CourseUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Teacher: Update course"""
    course = db.query(Course).filter(Course.id == course_id).first()
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    
    if course.instructor_id != current_user.id:
        raise HTTPException(status_code=403, detail="Only course instructor can update")
    
    if course_update.title:
        course.title = course_update.title
    if course_update.description is not None:
        course.description = course_update.description
    if course_update.status:
        course.status = CourseStatus(course_update.status)
    if course_update.price is not None:
        course.price = course_update.price
    
    db.commit()
    db.refresh(course)
    
    return course

@router.post("/{course_id}/enroll", response_model=schemas.EnrollmentResponse)
async def enroll_course(
    course_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Student: Enroll in course"""
    if current_user.role == UserRole.INSTRUCTOR:
        raise HTTPException(status_code=403, detail="Instructors cannot enroll in courses")
    
    course = db.query(Course).filter(Course.id == course_id).first()
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    
    if course.status != CourseStatus.PUBLISHED:
        raise HTTPException(status_code=400, detail="Course is not published")
    
    # Check if already enrolled
    existing = db.query(Enrollment).filter(
        Enrollment.user_id == current_user.id,
        Enrollment.course_id == course_id
    ).first()
    
    if existing:
        raise HTTPException(status_code=400, detail="Already enrolled")
    
    enrollment = Enrollment(
        user_id=current_user.id,
        course_id=course_id
    )
    
    db.add(enrollment)
    db.commit()
    db.refresh(enrollment)
    
    return enrollment

# ========== LESSON ROUTES ==========

@router.post("/lessons", response_model=schemas.LessonResponse, status_code=status.HTTP_201_CREATED)
async def create_lesson(
    lesson: schemas.LessonCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Teacher: Create lesson"""
    if current_user.role != UserRole.INSTRUCTOR:
        raise HTTPException(status_code=403, detail="Only instructors can create lessons")
    
    course = db.query(Course).filter(Course.id == lesson.course_id).first()
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    
    if course.instructor_id != current_user.id:
        raise HTTPException(status_code=403, detail="Only course instructor can add lessons")
    
    new_lesson = Lesson(
        course_id=lesson.course_id,
        title=lesson.title,
        content=lesson.content,
        video_url=lesson.video_url,
        order=lesson.order,
        duration=lesson.duration
    )
    
    db.add(new_lesson)
    db.commit()
    db.refresh(new_lesson)
    
    return new_lesson

@router.get("/courses/{course_id}/lessons", response_model=List[schemas.LessonResponse])
async def get_lessons(
    course_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get lessons for a course"""
    course = db.query(Course).filter(Course.id == course_id).first()
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    
    # Check access
    if course.status != CourseStatus.PUBLISHED:
        if course.instructor_id != current_user.id:
            # Check if student is enrolled
            enrollment = db.query(Enrollment).filter(
                Enrollment.user_id == current_user.id,
                Enrollment.course_id == course_id
            ).first()
            if not enrollment:
                raise HTTPException(status_code=403, detail="Access denied")
    
    lessons = db.query(Lesson).filter(Lesson.course_id == course_id).order_by(Lesson.order).all()
    return lessons

# ========== TEST ROUTES ==========

@router.post("/tests", response_model=schemas.TestResponse, status_code=status.HTTP_201_CREATED)
async def create_test(
    test: schemas.TestCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Teacher: Create test"""
    if current_user.role != UserRole.INSTRUCTOR:
        raise HTTPException(status_code=403, detail="Only instructors can create tests")
    
    lesson = db.query(Lesson).filter(Lesson.id == test.lesson_id).first()
    if not lesson:
        raise HTTPException(status_code=404, detail="Lesson not found")
    
    course = db.query(Course).filter(Course.id == lesson.course_id).first()
    if course.instructor_id != current_user.id:
        raise HTTPException(status_code=403, detail="Only course instructor can create tests")
    
    new_test = Test(
        lesson_id=test.lesson_id,
        title=test.title,
        description=test.description,
        time_limit=test.time_limit,
        passing_score=test.passing_score
    )
    
    db.add(new_test)
    db.commit()
    db.refresh(new_test)
    
    return new_test

@router.post("/tests/{test_id}/questions", response_model=schemas.QuestionResponse, status_code=status.HTTP_201_CREATED)
async def create_question(
    test_id: int,
    question: schemas.QuestionCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Teacher: Add question to test"""
    if current_user.role != UserRole.INSTRUCTOR:
        raise HTTPException(status_code=403, detail="Only instructors can create questions")
    
    test = db.query(Test).filter(Test.id == test_id).first()
    if not test:
        raise HTTPException(status_code=404, detail="Test not found")
    
    lesson = db.query(Lesson).filter(Lesson.id == test.lesson_id).first()
    course = db.query(Course).filter(Course.id == lesson.course_id).first()
    
    if course.instructor_id != current_user.id:
        raise HTTPException(status_code=403, detail="Access denied")
    
    new_question = Question(
        test_id=test_id,
        question_text=question.question_text,
        question_type=question.question_type,
        points=question.points,
        order=question.order
    )
    
    db.add(new_question)
    db.flush()
    
    # Add options
    for opt in question.options:
        option = QuestionOption(
            question_id=new_question.id,
            option_text=opt.option_text,
            is_correct=opt.is_correct,
            order=opt.order
        )
        db.add(option)
    
    db.commit()
    db.refresh(new_question)
    
    return new_question

@router.get("/tests/{test_id}", response_model=schemas.TestResponse)
async def get_test(
    test_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get test details"""
    test = db.query(Test).filter(Test.id == test_id).first()
    if not test:
        raise HTTPException(status_code=404, detail="Test not found")
    
    return test

@router.get("/tests/{test_id}/questions", response_model=List[schemas.QuestionResponse])
async def get_test_questions(
    test_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get questions for a test (without correct answers for students)"""
    test = db.query(Test).filter(Test.id == test_id).first()
    if not test:
        raise HTTPException(status_code=404, detail="Test not found")
    
    questions = db.query(Question).filter(Question.test_id == test_id).order_by(Question.order).all()
    
    # Hide correct answers for students
    if current_user.role != UserRole.INSTRUCTOR:
        for question in questions:
            for option in question.options:
                option.is_correct = False
    
    return questions

@router.post("/tests/{test_id}/attempt", response_model=schemas.TestAttemptResponse)
async def submit_test_attempt(
    test_id: int,
    attempt: schemas.TestAttemptCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Student: Submit test attempt"""
    if current_user.role == UserRole.INSTRUCTOR:
        raise HTTPException(status_code=403, detail="Instructors cannot take tests")
    
    test = db.query(Test).filter(Test.id == test_id).first()
    if not test:
        raise HTTPException(status_code=404, detail="Test not found")
    
    # Create attempt
    new_attempt = TestAttempt(
        user_id=current_user.id,
        test_id=test_id
    )
    db.add(new_attempt)
    db.flush()
    
    # Process answers and calculate score
    total_points = 0
    earned_points = 0
    
    for answer_data in attempt.answers:
        question = db.query(Question).filter(Question.id == answer_data.question_id).first()
        if not question:
            continue
        
        total_points += question.points
        
        # Check if answer is correct
        is_correct = False
        if question.question_type == "multiple_choice" and answer_data.option_id:
            option = db.query(QuestionOption).filter(
                QuestionOption.id == answer_data.option_id,
                QuestionOption.question_id == question.id
            ).first()
            if option and option.is_correct:
                is_correct = True
                earned_points += question.points
        
        answer = TestAnswer(
            attempt_id=new_attempt.id,
            question_id=question.id,
            answer_text=answer_data.answer_text,
            is_correct=is_correct,
            points_earned=question.points if is_correct else 0
        )
        db.add(answer)
    
    # Calculate score
    score = (earned_points / total_points * 100) if total_points > 0 else 0
    new_attempt.score = score
    new_attempt.passed = score >= test.passing_score
    
    db.commit()
    db.refresh(new_attempt)
    
    return new_attempt
