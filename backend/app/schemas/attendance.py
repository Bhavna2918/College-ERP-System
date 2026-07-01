from pydantic import BaseModel
from typing import Optional
from datetime import date as date_type, datetime


class AttendanceCreate(BaseModel):
    student_id: str
    subject_id: str
    attendance_date: date_type
    status: str  # PRESENT or ABSENT


class AttendanceBulkCreate(BaseModel):
    subject_id: str
    attendance_date: date_type
    records: list[dict]  # [{"student_id": "...", "status": "PRESENT"}, ...]


class AttendanceOut(BaseModel):
    id: str
    student_id: str
    subject_id: str
    attendance_date: date_type
    status: str
    created_at: datetime

    class Config:
        from_attributes = True


class AttendancePercentage(BaseModel):
    subject_id: str
    total_classes: int
    present_count: int
    percentage: float