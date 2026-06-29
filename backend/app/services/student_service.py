from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func, or_
from fastapi import HTTPException, status
from app.models.models import Student, User, UserRole
from app.schemas.student import StudentCreate, StudentUpdate
from app.utils.security import hash_password
import uuid
from datetime import datetime, timezone


class StudentService:

    @staticmethod
    async def create_student(data: StudentCreate, db: AsyncSession):
        # Check email not already taken
        result = await db.execute(select(User).where(User.email == data.email))
        if result.scalar_one_or_none():
            raise HTTPException(status_code=400, detail="Email already registered")

        # Check roll_no not already taken
        result = await db.execute(select(Student).where(Student.roll_no == data.roll_no))
        if result.scalar_one_or_none():
            raise HTTPException(status_code=400, detail="Roll number already exists")

        # Create user first
        user = User(
            name=data.name,
            email=data.email,
            password_hash=hash_password(data.password),
            role=UserRole.STUDENT,
        )
        db.add(user)
        await db.flush()  # get user.id without committing

        # Create student linked to user
        student = Student(
            user_id=user.id,
            roll_no=data.roll_no,
            department_id=data.department_id,
            semester_id=data.semester_id,
            dob=data.dob,
            gender=data.gender,
            blood_group=data.blood_group,
            admission_date=data.admission_date,
            phone=data.phone,
            address=data.address,
        )
        db.add(student)
        await db.commit()
        await db.refresh(student)
        await db.refresh(user)

        return _merge_student_user(student, user)

    @staticmethod
    async def get_all_students(db: AsyncSession, page: int, page_size: int, search: str = None):
        query = (
            select(Student, User)
            .join(User, Student.user_id == User.id)
            .where(Student.is_deleted == False, User.is_deleted == False)
        )

        if search:
            query = query.where(
                or_(
                    User.name.ilike(f"%{search}%"),
                    Student.roll_no.ilike(f"%{search}%"),
                    User.email.ilike(f"%{search}%"),
                )
            )

        # Total count
        count_query = select(func.count()).select_from(query.subquery())
        total = (await db.execute(count_query)).scalar()

        # Paginate
        query = query.offset((page - 1) * page_size).limit(page_size)
        result = await db.execute(query)
        rows = result.all()

        data = [_merge_student_user_list(s, u) for s, u in rows]
        return {"total": total, "page": page, "page_size": page_size, "data": data}

    @staticmethod
    async def get_student_by_id(student_id: uuid.UUID, db: AsyncSession):
        result = await db.execute(
            select(Student, User)
            .join(User, Student.user_id == User.id)
            .where(Student.id == student_id, Student.is_deleted == False)
        )
        row = result.one_or_none()
        if not row:
            raise HTTPException(status_code=404, detail="Student not found")
        student, user = row
        return _merge_student_user(student, user)

    @staticmethod
    async def get_my_profile(user: User, db: AsyncSession):
        result = await db.execute(
            select(Student, User)
            .join(User, Student.user_id == User.id)
            .where(Student.user_id == user.id, Student.is_deleted == False)
        )
        row = result.one_or_none()
        if not row:
            raise HTTPException(status_code=404, detail="Student profile not found")
        student, user = row
        return _merge_student_user(student, user)

    @staticmethod
    async def update_student(student_id: uuid.UUID, data: StudentUpdate, db: AsyncSession):
        result = await db.execute(
            select(Student, User)
            .join(User, Student.user_id == User.id)
            .where(Student.id == student_id, Student.is_deleted == False)
        )
        row = result.one_or_none()
        if not row:
            raise HTTPException(status_code=404, detail="Student not found")

        student, user = row
        update_data = data.model_dump(exclude_unset=True)

        # name goes to user table
        if "name" in update_data:
            user.name = update_data.pop("name")

        for field, value in update_data.items():
            setattr(student, field, value)

        await db.commit()
        await db.refresh(student)
        await db.refresh(user)
        return _merge_student_user(student, user)

    @staticmethod
    async def delete_student(student_id: uuid.UUID, db: AsyncSession):
        result = await db.execute(
            select(Student, User)
            .join(User, Student.user_id == User.id)
            .where(Student.id == student_id, Student.is_deleted == False)
        )
        row = result.one_or_none()
        if not row:
            raise HTTPException(status_code=404, detail="Student not found")

        student, user = row
        # Soft delete
        student.is_deleted = True
        student.deleted_at = datetime.now(timezone.utc)
        user.is_deleted = True
        user.deleted_at = datetime.now(timezone.utc)
        await db.commit()
        return {"message": "Student deleted successfully"}


# ── Helpers ───────────────────────────────────────────────────────────────────

def _merge_student_user(student: Student, user: User) -> dict:
    return {
        "id": student.id,
        "roll_no": student.roll_no,
        "department_id": student.department_id,
        "semester_id": student.semester_id,
        "dob": student.dob,
        "gender": student.gender,
        "blood_group": student.blood_group,
        "admission_date": student.admission_date,
        "phone": student.phone,
        "address": student.address,
        "created_at": student.created_at,
        "name": user.name,
        "email": user.email,
    }


def _merge_student_user_list(student: Student, user: User) -> dict:
    return {
        "id": student.id,
        "roll_no": student.roll_no,
        "name": user.name,
        "email": user.email,
        "department_id": student.department_id,
        "semester_id": student.semester_id,
        "phone": student.phone,
    }
