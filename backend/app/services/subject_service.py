from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from fastapi import HTTPException
from app.models.models import Subject
from app.schemas.subject import SubjectCreate, SubjectUpdate
import uuid


async def create_subject(db: AsyncSession, data: SubjectCreate):
    existing = await db.execute(select(Subject).where(Subject.subject_code == data.subject_code))
    if existing.scalar_one_or_none():
        raise HTTPException(status_code=400, detail="Subject code already exists")

    subject = Subject(id=str(uuid.uuid4()), **data.dict())
    db.add(subject)
    await db.commit()
    await db.refresh(subject)
    return subject


async def get_all_subjects(db: AsyncSession, course_id: str | None, semester_id: str | None):
    query = select(Subject)
    if course_id:
        query = query.where(Subject.course_id == course_id)
    if semester_id:
        query = query.where(Subject.semester_id == semester_id)
    result = await db.execute(query)
    return result.scalars().all()


async def get_subject_by_id(db: AsyncSession, subject_id: str):
    result = await db.execute(select(Subject).where(Subject.id == subject_id))
    subject = result.scalar_one_or_none()
    if not subject:
        raise HTTPException(status_code=404, detail="Subject not found")
    return subject


async def update_subject(db: AsyncSession, subject_id: str, data: SubjectUpdate):
    subject = await get_subject_by_id(db, subject_id)
    for field, value in data.dict(exclude_unset=True).items():
        setattr(subject, field, value)
    await db.commit()
    await db.refresh(subject)
    return subject


async def delete_subject(db: AsyncSession, subject_id: str):
    subject = await get_subject_by_id(db, subject_id)
    await db.delete(subject)
    await db.commit()
    return {"message": "Subject deleted successfully"}