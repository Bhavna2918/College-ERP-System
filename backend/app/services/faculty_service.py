from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func, or_
from fastapi import HTTPException
from app.models.models import Faculty, User, UserRole
from app.schemas.faculty import FacultyCreate, FacultyUpdate
from app.utils.security import hash_password
import uuid


async def create_faculty(db: AsyncSession, data: FacultyCreate):
    existing = await db.execute(select(User).where(User.email == data.email))
    if existing.scalar_one_or_none():
        raise HTTPException(status_code=400, detail="Email already registered")

    code_check = await db.execute(select(Faculty).where(Faculty.faculty_code == data.faculty_code))
    if code_check.scalar_one_or_none():
        raise HTTPException(status_code=400, detail="Faculty code already exists")

    user = User(
        id=str(uuid.uuid4()),
        name=data.name,
        email=data.email,
        password_hash=hash_password(data.password),
        role=UserRole.FACULTY,
        is_active=True,
    )
    db.add(user)
    await db.flush()

    faculty = Faculty(
        id=str(uuid.uuid4()),
        user_id=user.id,
        faculty_code=data.faculty_code,
        department_id=data.department_id,
        designation=data.designation,
        qualification=data.qualification,
        specialization=data.specialization,
        salary=data.salary,
        joining_date=data.joining_date,
        phone=data.phone,
    )
    db.add(faculty)
    await db.commit()
    await db.refresh(faculty)
    return faculty


async def get_faculty_list(db: AsyncSession, page: int, page_size: int, search: str | None):
    query = select(Faculty).join(User).where(Faculty.is_deleted == False)
    if search:
        query = query.where(or_(User.name.ilike(f"%{search}%"), Faculty.faculty_code.ilike(f"%{search}%")))

    total_result = await db.execute(select(func.count()).select_from(query.subquery()))
    total = total_result.scalar()

    query = query.offset((page - 1) * page_size).limit(page_size)
    result = await db.execute(query)
    return total, result.scalars().all()


async def get_faculty_by_id(db: AsyncSession, faculty_id: str):
    result = await db.execute(select(Faculty).where(Faculty.id == faculty_id, Faculty.is_deleted == False))
    faculty = result.scalar_one_or_none()
    if not faculty:
        raise HTTPException(status_code=404, detail="Faculty not found")
    return faculty


async def update_faculty(db: AsyncSession, faculty_id: str, data: FacultyUpdate):
    faculty = await get_faculty_by_id(db, faculty_id)
    for field, value in data.dict(exclude_unset=True).items():
        setattr(faculty, field, value)
    await db.commit()
    await db.refresh(faculty)
    return faculty


async def delete_faculty(db: AsyncSession, faculty_id: str):
    faculty = await get_faculty_by_id(db, faculty_id)
    faculty.is_deleted = True
    await db.commit()
    return {"message": "Faculty deleted successfully"}