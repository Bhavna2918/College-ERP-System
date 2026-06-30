from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession
from app.database.connection import get_db
from app.middleware.auth import require_admin
from app.schemas.faculty import FacultyCreate, FacultyUpdate, FacultyOut, FacultyListResponse
from app.services import faculty_service

router = APIRouter(prefix="/faculty", tags=["Faculty"])


@router.post("", response_model=FacultyOut, dependencies=[Depends(require_admin)])
async def create_faculty(data: FacultyCreate, db: AsyncSession = Depends(get_db)):
    return await faculty_service.create_faculty(db, data)


@router.get("", response_model=FacultyListResponse, dependencies=[Depends(require_admin)])
async def list_faculty(
    page: int = Query(1, ge=1),
    page_size: int = Query(10, ge=1, le=100),
    search: str | None = None,
    db: AsyncSession = Depends(get_db),
):
    total, data = await faculty_service.get_faculty_list(db, page, page_size, search)
    return {"total": total, "page": page, "page_size": page_size, "data": data}


@router.get("/{faculty_id}", response_model=FacultyOut, dependencies=[Depends(require_admin)])
async def get_faculty(faculty_id: str, db: AsyncSession = Depends(get_db)):
    return await faculty_service.get_faculty_by_id(db, faculty_id)


@router.put("/{faculty_id}", response_model=FacultyOut, dependencies=[Depends(require_admin)])
async def update_faculty(faculty_id: str, data: FacultyUpdate, db: AsyncSession = Depends(get_db)):
    return await faculty_service.update_faculty(db, faculty_id, data)


@router.delete("/{faculty_id}", dependencies=[Depends(require_admin)])
async def delete_faculty(faculty_id: str, db: AsyncSession = Depends(get_db)):
    return await faculty_service.delete_faculty(db, faculty_id)