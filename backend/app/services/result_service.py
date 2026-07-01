from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from fastapi import HTTPException
from app.models.models import Exam, ExamResult
from app.schemas.result import ExamCreate, ResultCreate, ResultUpdate
import uuid


async def create_exam(db: AsyncSession, data: ExamCreate):
    exam = Exam(id=str(uuid.uuid4()), **data.dict())
    db.add(exam)
    await db.commit()
    await db.refresh(exam)
    return exam


async def get_exams_by_subject(db: AsyncSession, subject_id: str):
    result = await db.execute(select(Exam).where(Exam.subject_id == subject_id))
    return result.scalars().all()


def calculate_grade(marks: float, max_marks: int) -> str:
    pct = (marks / max_marks) * 100 if max_marks else 0
    if pct >= 90: return "A+"
    if pct >= 80: return "A"
    if pct >= 70: return "B+"
    if pct >= 60: return "B"
    if pct >= 50: return "C"
    if pct >= 40: return "D"
    return "F"


async def add_result(db: AsyncSession, data: ResultCreate):
    existing = await db.execute(
        select(ExamResult).where(ExamResult.student_id == data.student_id, ExamResult.exam_id == data.exam_id)
    )
    if existing.scalar_one_or_none():
        raise HTTPException(status_code=400, detail="Result already exists for this student and exam")

    exam_result = await db.execute(select(Exam).where(Exam.id == data.exam_id))
    exam = exam_result.scalar_one_or_none()
    if not exam:
        raise HTTPException(status_code=404, detail="Exam not found")

    grade = data.grade or calculate_grade(float(data.marks_obtained), exam.max_marks)

    result = ExamResult(
        id=str(uuid.uuid4()),
        student_id=data.student_id,
        subject_id=data.subject_id,
        exam_id=data.exam_id,
        marks_obtained=data.marks_obtained,
        grade=grade,
    )
    db.add(result)
    await db.commit()
    await db.refresh(result)
    return result


async def get_results_by_student(db: AsyncSession, student_id: str, subject_id: str | None):
    query = select(ExamResult).where(ExamResult.student_id == student_id)
    if subject_id:
        query = query.where(ExamResult.subject_id == subject_id)
    result = await db.execute(query)
    return result.scalars().all()


async def update_result(db: AsyncSession, result_id: str, data: ResultUpdate):
    result = await db.execute(select(ExamResult).where(ExamResult.id == result_id))
    exam_result = result.scalar_one_or_none()
    if not exam_result:
        raise HTTPException(status_code=404, detail="Result not found")
    for field, value in data.dict(exclude_unset=True).items():
        setattr(exam_result, field, value)
    await db.commit()
    await db.refresh(exam_result)
    return exam_result