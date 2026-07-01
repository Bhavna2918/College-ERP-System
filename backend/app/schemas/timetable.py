from pydantic import BaseModel
from typing import Optional
from datetime import time as time_type, datetime


class TimetableCreate(BaseModel):
    subject_id: str
    faculty_id: str
    day: str  # MONDAY, TUESDAY, etc.
    room_no: str
    start_time: time_type
    end_time: time_type


class TimetableUpdate(BaseModel):
    day: Optional[str] = None
    room_no: Optional[str] = None
    start_time: Optional[time_type] = None
    end_time: Optional[time_type] = None


class TimetableOut(BaseModel):
    id: str
    subject_id: str
    faculty_id: str
    day: str
    room_no: str
    start_time: time_type
    end_time: time_type
    created_at: datetime

    class Config:
        from_attributes = True