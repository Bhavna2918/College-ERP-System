from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func, or_
from fastapi import HTTPException
from app.models.models import Course, Enrollment
from app.schemas.course import CourseCreate, CourseUpdate, EnrollRequest
import uuid


async def create_course(db: AsyncSession, data: CourseCreate):
    existing = await db.execute(select(Course).where(Course.course_code == data.course_code))
    if existing.scalar_one_or_none():
        raise HTTPException(status_code=400, detail="Course code already exists")

    course = Course(id=str(uuid.uuid4()), **data.dict())
    db.add(course)
    await db.commit()
    await db.refresh(course)
    return course


async def get_courses(db: AsyncSession, page: int, page_size: int, search: str | None):
    query = select(Course).where(Course.is_deleted == False)
    if search:
        query = query.where(or_(Course.course_name.ilike(f"%{search}%"), Course.course_code.ilike(f"%{search}%")))

    total_result = await db.execute(select(func.count()).select_from(query.subquery()))
    total = total_result.scalar()

    query = query.offset((page - 1) * page_size).limit(page_size)
    result = await db.execute(query)
    return total, result.scalars().all()


async def get_course_by_id(db: AsyncSession, course_id: str):
    result = await db.execute(select(Course).where(Course.id == course_id, Course.is_deleted == False))
    course = result.scalar_one_or_none()
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    return course


async def update_course(db: AsyncSession, course_id: str, data: CourseUpdate):
    course = await get_course_by_id(db, course_id)
    for field, value in data.dict(exclude_unset=True).items():
        setattr(course, field, value)
    await db.commit()
    await db.refresh(course)
    return course


async def delete_course(db: AsyncSession, course_id: str):
    course = await get_course_by_id(db, course_id)
    course.is_deleted = True
    await db.commit()
    return {"message": "Course deleted successfully"}


async def enroll_student(db: AsyncSession, data: EnrollRequest):
    existing = await db.execute(
        select(Enrollment).where(Enrollment.student_id == data.student_id, Enrollment.course_id == data.course_id)
    )
    if existing.scalar_one_or_none():
        raise HTTPException(status_code=400, detail="Student already enrolled in this course")

    enrollment = Enrollment(id=str(uuid.uuid4()), student_id=data.student_id, course_id=data.course_id)
    db.add(enrollment)
    await db.commit()
    await db.refresh(enrollment)
    return enrollment