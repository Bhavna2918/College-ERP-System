from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import date, datetime
import uuid


class StudentCreate(BaseModel):
    # User fields
    name: str
    email: EmailStr
    password: str
    # Student fields
    roll_no: str
    department_id: uuid.UUID
    semester_id: uuid.UUID
    dob: Optional[date] = None
    gender: Optional[str] = None
    blood_group: Optional[str] = None
    admission_date: Optional[date] = None
    phone: Optional[str] = None
    address: Optional[str] = None


class StudentUpdate(BaseModel):
    name: Optional[str] = None
    phone: Optional[str] = None
    address: Optional[str] = None
    gender: Optional[str] = None
    blood_group: Optional[str] = None
    dob: Optional[date] = None
    department_id: Optional[uuid.UUID] = None
    semester_id: Optional[uuid.UUID] = None


class StudentOut(BaseModel):
    id: uuid.UUID
    roll_no: str
    department_id: uuid.UUID
    semester_id: uuid.UUID
    dob: Optional[date] = None
    gender: Optional[str] = None
    blood_group: Optional[str] = None
    admission_date: Optional[date] = None
    phone: Optional[str] = None
    address: Optional[str] = None
    created_at: datetime
    # From user
    name: str
    email: str

    class Config:
        from_attributes = True


class StudentListOut(BaseModel):
    id: uuid.UUID
    roll_no: str
    name: str
    email: str
    department_id: uuid.UUID
    semester_id: uuid.UUID
    phone: Optional[str] = None

    class Config:
        from_attributes = True


class PaginatedStudents(BaseModel):
    total: int
    page: int
    page_size: int
    data: list[StudentListOut]
