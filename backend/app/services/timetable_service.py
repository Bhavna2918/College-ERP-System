from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, and_, or_
from fastapi import HTTPException
from app.models.models import Timetable, DayOfWeek
from app.schemas.timetable import TimetableCreate, TimetableUpdate
import uuid


async def check_conflict(db: AsyncSession, faculty_id: str, day: str, start_time, end_time, exclude_id: str | None = None):
    query = select(Timetable).where(
        Timetable.faculty_id == faculty_id,
        Timetable.day == DayOfWeek(day),
        or_(
            and_(Timetable.start_time <= start_time, Timetable.end_time > start_time),
            and_(Timetable.start_time < end_time, Timetable.end_time >= end_time),
            and_(Timetable.start_time >= start_time, Timetable.end_time <= end_time),
        ),
    )
    if exclude_id:
        query = query.where(Timetable.id != exclude_id)
    result = await db.execute(query)
    return result.scalar_one_or_none()


async def create_timetable_entry(db: AsyncSession, data: TimetableCreate):
    if data.start_time >= data.end_time:
        raise HTTPException(status_code=400, detail="start_time must be before end_time")

    conflict = await check_conflict(db, data.faculty_id, data.day, data.start_time, data.end_time)
    if conflict:
        raise HTTPException(status_code=400, detail="Faculty already has a class scheduled at this time")

    entry = Timetable(
        id=str(uuid.uuid4()),
        subject_id=data.subject_id,
        faculty_id=data.faculty_id,
        day=DayOfWeek(data.day),
        room_no=data.room_no,
        start_time=data.start_time,
        end_time=data.end_time,
    )
    db.add(entry)
    await db.commit()
    await db.refresh(entry)
    return entry


async def get_timetable_by_faculty(db: AsyncSession, faculty_id: str):
    result = await db.execute(select(Timetable).where(Timetable.faculty_id == faculty_id))
    return result.scalars().all()


async def get_timetable_by_subject(db: AsyncSession, subject_id: str):
    result = await db.execute(select(Timetable).where(Timetable.subject_id == subject_id))
    return result.scalars().all()


async def get_entry_by_id(db: AsyncSession, entry_id: str):
    result = await db.execute(select(Timetable).where(Timetable.id == entry_id))
    entry = result.scalar_one_or_none()
    if not entry:
        raise HTTPException(status_code=404, detail="Timetable entry not found")
    return entry


async def update_timetable_entry(db: AsyncSession, entry_id: str, data: TimetableUpdate):
    entry = await get_entry_by_id(db, entry_id)
    update_data = data.dict(exclude_unset=True)

    new_day = update_data.get("day", entry.day.value if hasattr(entry.day, "value") else entry.day)
    new_start = update_data.get("start_time", entry.start_time)
    new_end = update_data.get("end_time", entry.end_time)

    if new_start >= new_end:
        raise HTTPException(status_code=400, detail="start_time must be before end_time")

    conflict = await check_conflict(db, str(entry.faculty_id), new_day, new_start, new_end, exclude_id=entry_id)
    if conflict:
        raise HTTPException(status_code=400, detail="Faculty already has a class scheduled at this time")

    if "day" in update_data:
        update_data["day"] = DayOfWeek(update_data["day"])

    for field, value in update_data.items():
        setattr(entry, field, value)

    await db.commit()
    await db.refresh(entry)
    return entry


async def delete_timetable_entry(db: AsyncSession, entry_id: str):
    entry = await get_entry_by_id(db, entry_id)
    await db.delete(entry)
    await db.commit()
    return {"message": "Timetable entry deleted successfully"}