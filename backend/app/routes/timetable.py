from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.database.connection import get_db
from app.middleware.auth import require_admin, require_any
from app.schemas.timetable import TimetableCreate, TimetableUpdate, TimetableOut
from app.services import timetable_service

router = APIRouter(prefix="/timetable", tags=["Timetable"])


@router.post("", response_model=TimetableOut, dependencies=[Depends(require_admin)])
async def create_timetable_entry(data: TimetableCreate, db: AsyncSession = Depends(get_db)):
    return await timetable_service.create_timetable_entry(db, data)


@router.get("/faculty/{faculty_id}", response_model=list[TimetableOut], dependencies=[Depends(require_any)])
async def get_faculty_timetable(faculty_id: str, db: AsyncSession = Depends(get_db)):
    return await timetable_service.get_timetable_by_faculty(db, faculty_id)


@router.get("/subject/{subject_id}", response_model=list[TimetableOut], dependencies=[Depends(require_any)])
async def get_subject_timetable(subject_id: str, db: AsyncSession = Depends(get_db)):
    return await timetable_service.get_timetable_by_subject(db, subject_id)


@router.put("/{entry_id}", response_model=TimetableOut, dependencies=[Depends(require_admin)])
async def update_timetable_entry(entry_id: str, data: TimetableUpdate, db: AsyncSession = Depends(get_db)):
    return await timetable_service.update_timetable_entry(db, entry_id, data)


@router.delete("/{entry_id}", dependencies=[Depends(require_admin)])
async def delete_timetable_entry(entry_id: str, db: AsyncSession = Depends(get_db)):
    return await timetable_service.delete_timetable_entry(db, entry_id)