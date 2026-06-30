from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.database.connection import get_db
from app.middleware.auth import require_admin
from app.schemas.department import DepartmentCreate, DepartmentUpdate, DepartmentOut
from app.services import department_service

router = APIRouter(prefix="/departments", tags=["Departments"])


@router.post("", response_model=DepartmentOut, dependencies=[Depends(require_admin)])
async def create_department(data: DepartmentCreate, db: AsyncSession = Depends(get_db)):
    return await department_service.create_department(db, data)


@router.get("", response_model=list[DepartmentOut])
async def list_departments(db: AsyncSession = Depends(get_db)):
    return await department_service.get_all_departments(db)


@router.get("/{dept_id}", response_model=DepartmentOut)
async def get_department(dept_id: str, db: AsyncSession = Depends(get_db)):
    return await department_service.get_department_by_id(db, dept_id)


@router.put("/{dept_id}", response_model=DepartmentOut, dependencies=[Depends(require_admin)])
async def update_department(dept_id: str, data: DepartmentUpdate, db: AsyncSession = Depends(get_db)):
    return await department_service.update_department(db, dept_id, data)


@router.delete("/{dept_id}", dependencies=[Depends(require_admin)])
async def delete_department(dept_id: str, db: AsyncSession = Depends(get_db)):
    return await department_service.delete_department(db, dept_id)