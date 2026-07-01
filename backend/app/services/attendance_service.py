from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from fastapi import HTTPException
from app.models.models import Attendance, AttendanceStatus
from app.schemas.attendance import AttendanceCreate, AttendanceBulkCreate
import uuid


async def mark_attendance(db: AsyncSession, data: AttendanceCreate):
    existing = await db.execute(
        select(Attendance).where(
            Attendance.student_id == data.student_id,
            Attendance.subject_id == data.subject_id,
            Attendance.attendance_date == data.attendance_date,
        )
    )
    if existing.scalar_one_or_none():
        raise HTTPException(status_code=400, detail="Attendance already marked for this date")

    record = Attendance(
        id=str(uuid.uuid4()),
        student_id=data.student_id,
        subject_id=data.subject_id,
        attendance_date=data.attendance_date,
        status=AttendanceStatus(data.status),
    )
    db.add(record)
    await db.commit()
    await db.refresh(record)
    return record


async def mark_bulk_attendance(db: AsyncSession, data: AttendanceBulkCreate):
    created = []
    for entry in data.records:
        existing = await db.execute(
            select(Attendance).where(
                Attendance.student_id == entry["student_id"],
                Attendance.subject_id == data.subject_id,
                Attendance.attendance_date == data.attendance_date,
            )
        )
        if existing.scalar_one_or_none():
            continue
        record = Attendance(
            id=str(uuid.uuid4()),
            student_id=entry["student_id"],
            subject_id=data.subject_id,
            attendance_date=data.attendance_date,
            status=AttendanceStatus(entry["status"]),
        )
        db.add(record)
        created.append(record)
    await db.commit()
    return {"message": f"{len(created)} attendance records created"}


async def get_attendance_by_student(db: AsyncSession, student_id: str, subject_id: str | None):
    query = select(Attendance).where(Attendance.student_id == student_id)
    if subject_id:
        query = query.where(Attendance.subject_id == subject_id)
    result = await db.execute(query)
    return result.scalars().all()


async def get_attendance_percentage(db: AsyncSession, student_id: str, subject_id: str):
    total_result = await db.execute(
        select(func.count()).select_from(Attendance).where(
            Attendance.student_id == student_id, Attendance.subject_id == subject_id
        )
    )
    total = total_result.scalar() or 0

    present_result = await db.execute(
        select(func.count()).select_from(Attendance).where(
            Attendance.student_id == student_id,
            Attendance.subject_id == subject_id,
            Attendance.status == AttendanceStatus.PRESENT,
        )
    )
    present = present_result.scalar() or 0

    percentage = (present / total * 100) if total > 0 else 0.0
    return {
        "subject_id": subject_id,
        "total_classes": total,
        "present_count": present,
        "percentage": round(percentage, 2),
    }


async def get_attendance_by_subject(db: AsyncSession, subject_id: str, attendance_date):
    result = await db.execute(
        select(Attendance).where(Attendance.subject_id == subject_id, Attendance.attendance_date == attendance_date)
    )
    return result.scalars().all()