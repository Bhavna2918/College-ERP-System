from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession
from app.database.connection import get_db
from app.middleware.auth import require_admin, require_any
from app.schemas.course import CourseCreate, CourseUpdate, CourseOut, CourseListResponse, EnrollRequest
from app.services import course_service

router = APIRouter(prefix="/courses", tags=["Courses"])


@router.post("", response_model=CourseOut, dependencies=[Depends(require_admin)])
async def create_course(data: CourseCreate, db: AsyncSession = Depends(get_db)):
    return await course_service.create_course(db, data)


@router.get("", response_model=CourseListResponse, dependencies=[Depends(require_any)])
async def list_courses(
    page: int = Query(1, ge=1),
    page_size: int = Query(10, ge=1, le=100),
    search: str | None = None,
    db: AsyncSession = Depends(get_db),
):
    total, data = await course_service.get_courses(db, page, page_size, search)
    return {"total": total, "page": page, "page_size": page_size, "data": data}


@router.get("/{course_id}", response_model=CourseOut, dependencies=[Depends(require_any)])
async def get_course(course_id: str, db: AsyncSession = Depends(get_db)):
    return await course_service.get_course_by_id(db, course_id)


@router.put("/{course_id}", response_model=CourseOut, dependencies=[Depends(require_admin)])
async def update_course(course_id: str, data: CourseUpdate, db: AsyncSession = Depends(get_db)):
    return await course_service.update_course(db, course_id, data)


@router.delete("/{course_id}", dependencies=[Depends(require_admin)])
async def delete_course(course_id: str, db: AsyncSession = Depends(get_db)):
    return await course_service.delete_course(db, course_id)


@router.post("/enroll", dependencies=[Depends(require_admin)])
async def enroll_student(data: EnrollRequest, db: AsyncSession = Depends(get_db)):
    return await course_service.enroll_student(db, data)