"""
Courses routes
"""
from fastapi import APIRouter
from typing import List

router = APIRouter()

@router.get("/")
async def get_courses():
    """Get all courses"""
    # Placeholder - will be implemented later
    return [
        {
            "id": 1,
            "title": "Python Programming",
            "description": "Learn Python from scratch",
            "price": 500000,
            "instructor": "John Doe"
        },
        {
            "id": 2,
            "title": "Web Development",
            "description": "Full stack web development",
            "price": 750000,
            "instructor": "Jane Smith"
        }
    ]

