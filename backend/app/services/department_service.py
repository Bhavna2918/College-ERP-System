from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from fastapi import HTTPException
from app.models.models import Department
from app.schemas.department import DepartmentCreate, DepartmentUpdate
import uuid


async def create_department(db: AsyncSession, data: DepartmentCreate):
    existing = await db.execute(select(Department).where(Department.department_code == data.department_code))
    if existing.scalar_one_or_none():
        raise HTTPException(status_code=400, detail="Department code already exists")

    dept = Department(id=str(uuid.uuid4()), **data.dict())
    db.add(dept)
    await db.commit()
    await db.refresh(dept)
    return dept


async def get_all_departments(db: AsyncSession):
    result = await db.execute(select(Department))
    return result.scalars().all()


async def get_department_by_id(db: AsyncSession, dept_id: str):
    result = await db.execute(select(Department).where(Department.id == dept_id))
    dept = result.scalar_one_or_none()
    if not dept:
        raise HTTPException(status_code=404, detail="Department not found")
    return dept


async def update_department(db: AsyncSession, dept_id: str, data: DepartmentUpdate):
    dept = await get_department_by_id(db, dept_id)
    for field, value in data.dict(exclude_unset=True).items():
        setattr(dept, field, value)
    await db.commit()
    await db.refresh(dept)
    return dept


async def delete_department(db: AsyncSession, dept_id: str):
    dept = await get_department_by_id(db, dept_id)
    await db.delete(dept)
    await db.commit()
    return {"message": "Department deleted successfully"}