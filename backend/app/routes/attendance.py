from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from datetime import date as date_type
from app.database.connection import get_db
from app.middleware.auth import require_faculty, require_any
from app.schemas.attendance import AttendanceCreate, AttendanceBulkCreate, AttendanceOut, AttendancePercentage
from app.services import attendance_service

router = APIRouter(prefix="/attendance", tags=["Attendance"])


@router.post("", response_model=AttendanceOut, dependencies=[Depends(require_faculty)])
async def mark_attendance(data: AttendanceCreate, db: AsyncSession = Depends(get_db)):
    return await attendance_service.mark_attendance(db, data)


@router.post("/bulk", dependencies=[Depends(require_faculty)])
async def mark_bulk_attendance(data: AttendanceBulkCreate, db: AsyncSession = Depends(get_db)):
    return await attendance_service.mark_bulk_attendance(db, data)


@router.get("/student/{student_id}", response_model=list[AttendanceOut], dependencies=[Depends(require_any)])
async def get_student_attendance(student_id: str, subject_id: str | None = None, db: AsyncSession = Depends(get_db)):
    return await attendance_service.get_attendance_by_student(db, student_id, subject_id)


@router.get("/percentage/{student_id}/{subject_id}", response_model=AttendancePercentage, dependencies=[Depends(require_any)])
async def get_attendance_percentage(student_id: str, subject_id: str, db: AsyncSession = Depends(get_db)):
    return await attendance_service.get_attendance_percentage(db, student_id, subject_id)


@router.get("/subject/{subject_id}", response_model=list[AttendanceOut], dependencies=[Depends(require_faculty)])
async def get_subject_attendance(subject_id: str, attendance_date: date_type, db: AsyncSession = Depends(get_db)):
    return await attendance_service.get_attendance_by_subject(db, subject_id, attendance_date)