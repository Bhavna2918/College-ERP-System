from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession
from app.database.connection import get_db
from app.schemas.student import StudentCreate, StudentUpdate, StudentOut, PaginatedStudents
from app.services.student_service import StudentService
from app.middleware.auth import get_current_user, require_admin, require_any
from app.models.models import User
import uuid

router = APIRouter(prefix="/students", tags=["Students"])


@router.post("", response_model=StudentOut, status_code=201)
async def create_student(
    body: StudentCreate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(require_admin),
):
    """Create a new student. Admin only."""
    return await StudentService.create_student(body, db)


@router.get("", response_model=PaginatedStudents)
async def get_all_students(
    page: int = Query(1, ge=1),
    page_size: int = Query(10, ge=1, le=100),
    search: str = Query(None),
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(require_admin),
):
    """Get all students with pagination and search. Admin only."""
    return await StudentService.get_all_students(db, page, page_size, search)


@router.get("/me", response_model=StudentOut)
async def get_my_profile(
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Get own profile. Student only."""
    return await StudentService.get_my_profile(current_user, db)


@router.get("/{student_id}", response_model=StudentOut)
async def get_student(
    student_id: uuid.UUID,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(require_any),
):
    """Get student by ID. Admin and Faculty can access."""
    return await StudentService.get_student_by_id(student_id, db)


@router.put("/{student_id}", response_model=StudentOut)
async def update_student(
    student_id: uuid.UUID,
    body: StudentUpdate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(require_admin),
):
    """Update student details. Admin only."""
    return await StudentService.update_student(student_id, body, db)


@router.delete("/{student_id}")
async def delete_student(
    student_id: uuid.UUID,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(require_admin),
):
    """Soft delete a student. Admin only."""
    return await StudentService.delete_student(student_id, db)
