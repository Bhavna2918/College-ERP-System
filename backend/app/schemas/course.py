from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class CourseCreate(BaseModel):
    course_name: str
    course_code: str
    department_id: Optional[str] = None
    course_type: Optional[str] = None  # UG, PG, Diploma, PhD
    duration_years: Optional[int] = None
    total_credits_required: Optional[int] = None


class CourseUpdate(BaseModel):
    course_name: Optional[str] = None
    department_id: Optional[str] = None
    course_type: Optional[str] = None
    duration_years: Optional[int] = None
    total_credits_required: Optional[int] = None


class CourseOut(BaseModel):
    id: str
    course_name: str
    course_code: str
    department_id: Optional[str] = None
    course_type: Optional[str] = None
    duration_years: Optional[int] = None
    total_credits_required: Optional[int] = None
    created_at: datetime

    class Config:
        from_attributes = True


class CourseListResponse(BaseModel):
    total: int
    page: int
    page_size: int
    data: list[CourseOut]


class EnrollRequest(BaseModel):
    student_id: str
    course_id: str