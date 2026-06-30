from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class SubjectCreate(BaseModel):
    subject_name: str
    subject_code: str
    department_id: Optional[str] = None
    course_id: Optional[str] = None
    faculty_id: Optional[str] = None
    semester_id: Optional[str] = None
    credits: Optional[int] = 3
    theory_marks: Optional[int] = 100
    practical_marks: Optional[int] = 0
    is_elective: Optional[bool] = False


class SubjectUpdate(BaseModel):
    subject_name: Optional[str] = None
    faculty_id: Optional[str] = None
    credits: Optional[int] = None
    theory_marks: Optional[int] = None
    practical_marks: Optional[int] = None
    is_elective: Optional[bool] = None


class SubjectOut(BaseModel):
    id: str
    subject_name: str
    subject_code: str
    department_id: Optional[str] = None
    course_id: Optional[str] = None
    faculty_id: Optional[str] = None
    semester_id: Optional[str] = None
    credits: int
    theory_marks: int
    practical_marks: int
    is_elective: bool
    created_at: datetime

    class Config:
        from_attributes = True