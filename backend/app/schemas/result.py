from pydantic import BaseModel
from typing import Optional
from datetime import date as date_type, datetime
from decimal import Decimal


class ExamCreate(BaseModel):
    subject_id: str
    exam_type: str  # Mid Sem, End Sem, Quiz
    exam_date: Optional[date_type] = None
    max_marks: Optional[int] = 100


class ExamOut(BaseModel):
    id: str
    subject_id: str
    exam_type: str
    exam_date: Optional[date_type] = None
    max_marks: int
    created_at: datetime

    class Config:
        from_attributes = True


class ResultCreate(BaseModel):
    student_id: str
    subject_id: str
    exam_id: str
    marks_obtained: Decimal
    grade: Optional[str] = None


class ResultUpdate(BaseModel):
    marks_obtained: Optional[Decimal] = None
    grade: Optional[str] = None


class ResultOut(BaseModel):
    id: str
    student_id: str
    subject_id: str
    exam_id: str
    marks_obtained: Decimal
    grade: Optional[str] = None
    created_at: datetime

    class Config:
        from_attributes = True