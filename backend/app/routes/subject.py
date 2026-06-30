from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.database.connection import get_db
from app.middleware.auth import require_admin, require_any
from app.schemas.subject import SubjectCreate, SubjectUpdate, SubjectOut
from app.services import subject_service

router = APIRouter(prefix="/subjects", tags=["Subjects"])


@router.post("", response_model=SubjectOut, dependencies=[Depends(require_admin)])
async def create_subject(data: SubjectCreate, db: AsyncSession = Depends(get_db)):
    return await subject_service.create_subject(db, data)


@router.get("", response_model=list[SubjectOut], dependencies=[Depends(require_any)])
async def list_subjects(
    course_id: str | None = None,
    semester_id: str | None = None,
    db: AsyncSession = Depends(get_db),
):
    return await subject_service.get_all_subjects(db, course_id, semester_id)


@router.get("/{subject_id}", response_model=SubjectOut, dependencies=[Depends(require_any)])
async def get_subject(subject_id: str, db: AsyncSession = Depends(get_db)):
    return await subject_service.get_subject_by_id(db, subject_id)


@router.put("/{subject_id}", response_model=SubjectOut, dependencies=[Depends(require_admin)])
async def update_subject(subject_id: str, data: SubjectUpdate, db: AsyncSession = Depends(get_db)):
    return await subject_service.update_subject(db, subject_id, data)


@router.delete("/{subject_id}", dependencies=[Depends(require_admin)])
async def delete_subject(subject_id: str, db: AsyncSession = Depends(get_db)):
    return await subject_service.delete_subject(db, subject_id)