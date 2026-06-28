import uuid
from datetime import datetime, date, time
from decimal import Decimal
from sqlalchemy import (
    Column, String, Boolean, Integer, Text, Date, Time,
    DateTime, Numeric, ForeignKey, UniqueConstraint, CheckConstraint,
    Enum as SAEnum
)
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from app.database.connection import Base
import enum


# ── Enums ────────────────────────────────────────────────────────────────────

class UserRole(str, enum.Enum):
    ADMIN = "ADMIN"
    STUDENT = "STUDENT"
    FACULTY = "FACULTY"


class AttendanceStatus(str, enum.Enum):
    PRESENT = "PRESENT"
    ABSENT = "ABSENT"


class DayOfWeek(str, enum.Enum):
    MONDAY = "MONDAY"
    TUESDAY = "TUESDAY"
    WEDNESDAY = "WEDNESDAY"
    THURSDAY = "THURSDAY"
    FRIDAY = "FRIDAY"
    SATURDAY = "SATURDAY"
    SUNDAY = "SUNDAY"


class TokenType(str, enum.Enum):
    REFRESH = "REFRESH"
    PASSWORD_RESET = "PASSWORD_RESET"


# ── Models ───────────────────────────────────────────────────────────────────

class Campus(Base):
    __tablename__ = "campuses"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    campus_name = Column(String(255), nullable=False)
    campus_code = Column(String(20), unique=True, nullable=False)
    address = Column(Text)
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow)

    users = relationship("User", back_populates="campus")
    departments = relationship("Department", back_populates="campus")


class User(Base):
    __tablename__ = "users"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    campus_id = Column(UUID(as_uuid=True), ForeignKey("campuses.id", ondelete="SET NULL"), nullable=True)
    name = Column(String(255), nullable=False)
    email = Column(String(255), unique=True, nullable=False)
    password_hash = Column(String(255), nullable=False)
    role = Column(SAEnum(UserRole, name="user_role"), nullable=False)
    last_login = Column(DateTime(timezone=True), nullable=True)
    profile_picture_url = Column(Text, nullable=True)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow)
    updated_at = Column(DateTime(timezone=True), default=datetime.utcnow)
    is_deleted = Column(Boolean, default=False)
    deleted_at = Column(DateTime(timezone=True), nullable=True)

    campus = relationship("Campus", back_populates="users")
    auth_tokens = relationship("AuthToken", back_populates="user", cascade="all, delete")
    student = relationship("Student", back_populates="user", uselist=False)
    faculty = relationship("Faculty", back_populates="user", uselist=False)
    announcements = relationship("Announcement", back_populates="creator")


class AuthToken(Base):
    __tablename__ = "auth_tokens"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    type = Column(SAEnum(TokenType, name="token_type"), nullable=False)
    token = Column(String(512), unique=True, nullable=False)
    expires_at = Column(DateTime(timezone=True), nullable=False)
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow)

    user = relationship("User", back_populates="auth_tokens")


class Department(Base):
    __tablename__ = "departments"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    campus_id = Column(UUID(as_uuid=True), ForeignKey("campuses.id", ondelete="SET NULL"), nullable=True)
    department_name = Column(String(100), unique=True, nullable=False)
    department_code = Column(String(20), unique=True, nullable=False)

    campus = relationship("Campus", back_populates="departments")
    students = relationship("Student", back_populates="department")
    faculty = relationship("Faculty", back_populates="department")
    courses = relationship("Course", back_populates="department")
    subjects = relationship("Subject", back_populates="department")


class Semester(Base):
    __tablename__ = "semesters"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    semester_number = Column(Integer, nullable=False)
    academic_year = Column(String(20), nullable=False)

    students = relationship("Student", back_populates="semester")
    subjects = relationship("Subject", back_populates="semester")


class Student(Base):
    __tablename__ = "students"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    roll_no = Column(String(50), unique=True, nullable=False)
    department_id = Column(UUID(as_uuid=True), ForeignKey("departments.id", ondelete="RESTRICT"), nullable=False)
    semester_id = Column(UUID(as_uuid=True), ForeignKey("semesters.id", ondelete="RESTRICT"), nullable=False)
    dob = Column(Date, nullable=True)
    gender = Column(String(20), nullable=True)
    blood_group = Column(String(10), nullable=True)
    admission_date = Column(Date, nullable=True)
    phone = Column(String(20), nullable=True)
    address = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow)
    updated_at = Column(DateTime(timezone=True), default=datetime.utcnow)
    is_deleted = Column(Boolean, default=False)
    deleted_at = Column(DateTime(timezone=True), nullable=True)

    user = relationship("User", back_populates="student")
    department = relationship("Department", back_populates="students")
    semester = relationship("Semester", back_populates="students")
    guardian = relationship("ParentGuardianDetail", back_populates="student", uselist=False)
    enrollments = relationship("Enrollment", back_populates="student")
    subject_enrollments = relationship("SubjectEnrollment", back_populates="student")
    attendance = relationship("Attendance", back_populates="student")
    exam_results = relationship("ExamResult", back_populates="student")
    fees = relationship("Fee", back_populates="student")
    leave_requests = relationship("LeaveRequest", back_populates="student")
    assignment_submissions = relationship("AssignmentSubmission", back_populates="student")
    book_issues = relationship("BookIssueRecord", back_populates="student")


class ParentGuardianDetail(Base):
    __tablename__ = "parent_guardian_details"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    student_id = Column(UUID(as_uuid=True), ForeignKey("students.id", ondelete="CASCADE"), unique=True, nullable=False)
    father_name = Column(String(255), nullable=True)
    mother_name = Column(String(255), nullable=True)
    primary_phone = Column(String(20), nullable=False)
    emergency_contact = Column(String(20), nullable=False)
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow)

    student = relationship("Student", back_populates="guardian")


class Faculty(Base):
    __tablename__ = "faculty"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    faculty_code = Column(String(50), unique=True, nullable=False)
    department_id = Column(UUID(as_uuid=True), ForeignKey("departments.id", ondelete="RESTRICT"), nullable=False)
    designation = Column(String(100), nullable=True)
    qualification = Column(String(100), nullable=True)
    specialization = Column(String(255), nullable=True)
    salary = Column(Numeric(12, 2), nullable=True)
    joining_date = Column(Date, nullable=True)
    phone = Column(String(20), nullable=True)
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow)
    updated_at = Column(DateTime(timezone=True), default=datetime.utcnow)
    is_deleted = Column(Boolean, default=False)
    deleted_at = Column(DateTime(timezone=True), nullable=True)

    user = relationship("User", back_populates="faculty")
    department = relationship("Department", back_populates="faculty")
    subjects = relationship("Subject", back_populates="faculty")
    timetable = relationship("Timetable", back_populates="faculty")


class Course(Base):
    __tablename__ = "courses"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    course_name = Column(String(255), nullable=False)
    course_code = Column(String(50), unique=True, nullable=False)
    department_id = Column(UUID(as_uuid=True), ForeignKey("departments.id", ondelete="RESTRICT"), nullable=True)
    course_type = Column(String(50), nullable=True)
    duration_years = Column(Integer, nullable=True)
    total_credits_required = Column(Integer, nullable=True)
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow)
    updated_at = Column(DateTime(timezone=True), default=datetime.utcnow)
    is_deleted = Column(Boolean, default=False)
    deleted_at = Column(DateTime(timezone=True), nullable=True)

    department = relationship("Department", back_populates="courses")
    enrollments = relationship("Enrollment", back_populates="course")
    subjects = relationship("Subject", back_populates="course")


class Subject(Base):
    __tablename__ = "subjects"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    subject_name = Column(String(100), nullable=False)
    subject_code = Column(String(20), unique=True, nullable=False)
    department_id = Column(UUID(as_uuid=True), ForeignKey("departments.id", ondelete="CASCADE"), nullable=True)
    course_id = Column(UUID(as_uuid=True), ForeignKey("courses.id", ondelete="CASCADE"), nullable=True)
    faculty_id = Column(UUID(as_uuid=True), ForeignKey("faculty.id", ondelete="SET NULL"), nullable=True)
    semester_id = Column(UUID(as_uuid=True), ForeignKey("semesters.id", ondelete="CASCADE"), nullable=True)
    credits = Column(Integer, default=3)
    theory_marks = Column(Integer, default=100)
    practical_marks = Column(Integer, default=0)
    is_elective = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow)

    department = relationship("Department", back_populates="subjects")
    course = relationship("Course", back_populates="subjects")
    faculty = relationship("Faculty", back_populates="subjects")
    semester = relationship("Semester", back_populates="subjects")
    attendance = relationship("Attendance", back_populates="subject")
    subject_enrollments = relationship("SubjectEnrollment", back_populates="subject")
    exams = relationship("Exam", back_populates="subject")
    exam_results = relationship("ExamResult", back_populates="subject")
    timetable = relationship("Timetable", back_populates="subject")
    assignments = relationship("Assignment", back_populates="subject")


class Enrollment(Base):
    __tablename__ = "enrollments"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    student_id = Column(UUID(as_uuid=True), ForeignKey("students.id", ondelete="CASCADE"), nullable=False)
    course_id = Column(UUID(as_uuid=True), ForeignKey("courses.id", ondelete="CASCADE"), nullable=False)
    enrolled_at = Column(DateTime(timezone=True), default=datetime.utcnow)

    __table_args__ = (UniqueConstraint("student_id", "course_id"),)

    student = relationship("Student", back_populates="enrollments")
    course = relationship("Course", back_populates="enrollments")


class SubjectEnrollment(Base):
    __tablename__ = "subject_enrollments"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    student_id = Column(UUID(as_uuid=True), ForeignKey("students.id", ondelete="CASCADE"), nullable=False)
    subject_id = Column(UUID(as_uuid=True), ForeignKey("subjects.id", ondelete="CASCADE"), nullable=False)
    enrolled_at = Column(DateTime(timezone=True), default=datetime.utcnow)

    __table_args__ = (UniqueConstraint("student_id", "subject_id"),)

    student = relationship("Student", back_populates="subject_enrollments")
    subject = relationship("Subject", back_populates="subject_enrollments")


class Attendance(Base):
    __tablename__ = "attendance"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    student_id = Column(UUID(as_uuid=True), ForeignKey("students.id", ondelete="CASCADE"), nullable=False)
    subject_id = Column(UUID(as_uuid=True), ForeignKey("subjects.id", ondelete="CASCADE"), nullable=False)
    attendance_date = Column(Date, nullable=False)
    status = Column(SAEnum(AttendanceStatus, name="attendance_status"), nullable=False)
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow)

    __table_args__ = (UniqueConstraint("student_id", "subject_id", "attendance_date"),)

    student = relationship("Student", back_populates="attendance")
    subject = relationship("Subject", back_populates="attendance")


class Assignment(Base):
    __tablename__ = "assignments"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    subject_id = Column(UUID(as_uuid=True), ForeignKey("subjects.id", ondelete="CASCADE"), nullable=True)
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=True)
    due_date = Column(Date, nullable=True)
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow)

    subject = relationship("Subject", back_populates="assignments")
    submissions = relationship("AssignmentSubmission", back_populates="assignment")


class AssignmentSubmission(Base):
    __tablename__ = "assignment_submissions"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    student_id = Column(UUID(as_uuid=True), ForeignKey("students.id", ondelete="CASCADE"), nullable=False)
    assignment_id = Column(UUID(as_uuid=True), ForeignKey("assignments.id", ondelete="CASCADE"), nullable=False)
    file_url = Column(Text, nullable=False)
    marks_obtained = Column(Numeric(5, 2), nullable=True)
    submitted_at = Column(DateTime(timezone=True), default=datetime.utcnow)

    __table_args__ = (UniqueConstraint("student_id", "assignment_id"),)

    student = relationship("Student", back_populates="assignment_submissions")
    assignment = relationship("Assignment", back_populates="submissions")


class Exam(Base):
    __tablename__ = "exams"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    subject_id = Column(UUID(as_uuid=True), ForeignKey("subjects.id", ondelete="CASCADE"), nullable=True)
    exam_type = Column(String(50), nullable=True)
    exam_date = Column(Date, nullable=True)
    max_marks = Column(Integer, default=100)
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow)

    subject = relationship("Subject", back_populates="exams")
    results = relationship("ExamResult", back_populates="exam")


class ExamResult(Base):
    __tablename__ = "exam_results"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    student_id = Column(UUID(as_uuid=True), ForeignKey("students.id", ondelete="CASCADE"), nullable=False)
    subject_id = Column(UUID(as_uuid=True), ForeignKey("subjects.id", ondelete="CASCADE"), nullable=False)
    exam_id = Column(UUID(as_uuid=True), ForeignKey("exams.id", ondelete="CASCADE"), nullable=False)
    marks_obtained = Column(Numeric(5, 2), default=0)
    grade = Column(String(5), nullable=True)
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow)

    __table_args__ = (UniqueConstraint("student_id", "exam_id"),)

    student = relationship("Student", back_populates="exam_results")
    subject = relationship("Subject", back_populates="exam_results")
    exam = relationship("Exam", back_populates="results")


class Timetable(Base):
    __tablename__ = "timetable"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    subject_id = Column(UUID(as_uuid=True), ForeignKey("subjects.id", ondelete="CASCADE"), nullable=False)
    faculty_id = Column(UUID(as_uuid=True), ForeignKey("faculty.id", ondelete="CASCADE"), nullable=False)
    day = Column(SAEnum(DayOfWeek, name="day_of_week"), nullable=False)
    room_no = Column(String(50), nullable=False)
    start_time = Column(Time, nullable=False)
    end_time = Column(Time, nullable=False)
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow)

    subject = relationship("Subject", back_populates="timetable")
    faculty = relationship("Faculty", back_populates="timetable")


class Fee(Base):
    __tablename__ = "fees"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    student_id = Column(UUID(as_uuid=True), ForeignKey("students.id", ondelete="CASCADE"), nullable=True)
    fee_type = Column(String(100), nullable=True)
    amount = Column(Numeric(10, 2), nullable=False)
    payment_status = Column(String(20), nullable=True)
    due_date = Column(Date, nullable=True)
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow)

    student = relationship("Student", back_populates="fees")
    transactions = relationship("FeeTransaction", back_populates="fee")


class FeeTransaction(Base):
    __tablename__ = "fee_transactions"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    fee_id = Column(UUID(as_uuid=True), ForeignKey("fees.id", ondelete="CASCADE"), nullable=False)
    transaction_reference = Column(String(255), unique=True, nullable=False)
    payment_method = Column(String(50), nullable=False)
    amount_paid = Column(Numeric(10, 2), nullable=False)
    payment_date = Column(DateTime(timezone=True), default=datetime.utcnow)

    fee = relationship("Fee", back_populates="transactions")


class LeaveRequest(Base):
    __tablename__ = "leave_requests"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    student_id = Column(UUID(as_uuid=True), ForeignKey("students.id", ondelete="CASCADE"), nullable=True)
    reason = Column(Text, nullable=False)
    status = Column(String(20), default="PENDING")
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow)

    student = relationship("Student", back_populates="leave_requests")


class Announcement(Base):
    __tablename__ = "announcements"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    title = Column(String(255), nullable=False)
    message = Column(Text, nullable=False)
    created_by = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=True)
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow)

    creator = relationship("User", back_populates="announcements")


class Notification(Base):
    __tablename__ = "notifications"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    title = Column(String(255), nullable=False)
    message = Column(Text, nullable=False)
    target_role = Column(SAEnum(UserRole, name="user_role"), nullable=True)
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow)


class Book(Base):
    __tablename__ = "books"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    title = Column(String(255), nullable=False)
    author = Column(String(255), nullable=True)
    isbn = Column(String(50), unique=True, nullable=True)
    total_copies = Column(Integer, default=1)
    available_copies = Column(Integer, default=1)
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow)

    issue_records = relationship("BookIssueRecord", back_populates="book")


class BookIssueRecord(Base):
    __tablename__ = "book_issue_records"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    student_id = Column(UUID(as_uuid=True), ForeignKey("students.id", ondelete="CASCADE"), nullable=True)
    book_id = Column(UUID(as_uuid=True), ForeignKey("books.id", ondelete="CASCADE"), nullable=True)
    issue_date = Column(Date, nullable=False, default=date.today)
    return_date = Column(Date, nullable=True)

    student = relationship("Student", back_populates="book_issues")
    book = relationship("Book", back_populates="issue_records")
