from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import date, datetime
from decimal import Decimal


class FacultyCreate(BaseModel):
    name: str
    email: EmailStr
    password: str
    faculty_code: str
    department_id: str
    designation: Optional[str] = None
    qualification: Optional[str] = None
    specialization: Optional[str] = None
    salary: Optional[Decimal] = None
    joining_date: Optional[date] = None
    phone: Optional[str] = None


class FacultyUpdate(BaseModel):
    designation: Optional[str] = None
    qualification: Optional[str] = None
    specialization: Optional[str] = None
    salary: Optional[Decimal] = None
    phone: Optional[str] = None
    department_id: Optional[str] = None


class FacultyOut(BaseModel):
    id: str
    user_id: str
    faculty_code: str
    department_id: str
    designation: Optional[str] = None
    qualification: Optional[str] = None
    specialization: Optional[str] = None
    salary: Optional[Decimal] = None
    joining_date: Optional[date] = None
    phone: Optional[str] = None
    created_at: datetime

    class Config:
        from_attributes = True


class FacultyListResponse(BaseModel):
    total: int
    page: int
    page_size: int
    data: list[FacultyOut]