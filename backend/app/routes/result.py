from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.database.connection import get_db
from app.middleware.auth import require_faculty, require_any
from app.schemas.result import ExamCreate, ExamOut, ResultCreate, ResultUpdate, ResultOut
from app.services import result_service

router = APIRouter(prefix="/results", tags=["Results"])


@router.post("/exams", response_model=ExamOut, dependencies=[Depends(require_faculty)])
async def create_exam(data: ExamCreate, db: AsyncSession = Depends(get_db)):
    return await result_service.create_exam(db, data)


@router.get("/exams/subject/{subject_id}", response_model=list[ExamOut], dependencies=[Depends(require_any)])
async def get_exams(subject_id: str, db: AsyncSession = Depends(get_db)):
    return await result_service.get_exams_by_subject(db, subject_id)


@router.post("", response_model=ResultOut, dependencies=[Depends(require_faculty)])
async def add_result(data: ResultCreate, db: AsyncSession = Depends(get_db)):
    return await result_service.add_result(db, data)


@router.get("/student/{student_id}", response_model=list[ResultOut], dependencies=[Depends(require_any)])
async def get_student_results(student_id: str, subject_id: str | None = None, db: AsyncSession = Depends(get_db)):
    return await result_service.get_results_by_student(db, student_id, subject_id)


@router.put("/{result_id}", response_model=ResultOut, dependencies=[Depends(require_faculty)])
async def update_result(result_id: str, data: ResultUpdate, db: AsyncSession = Depends(get_db)):
    return await result_service.update_result(db, result_id, data)