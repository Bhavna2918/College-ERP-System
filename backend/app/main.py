from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import auth, students, faculty, department

app = FastAPI(
    title="College ERP System",
    description="Backend API for College ERP - Student, Faculty, Admin management",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/api/v1")
app.include_router(students.router, prefix="/api/v1")
app.include_router(faculty.router, prefix="/api/v1")
app.include_router(department.router, prefix="/api/v1")

# Coming soon:
# app.include_router(faculty.router, prefix="/api/v1")
# app.include_router(courses.router, prefix="/api/v1")
# app.include_router(attendance.router, prefix="/api/v1")
# app.include_router(results.router, prefix="/api/v1")
# app.include_router(timetable.router, prefix="/api/v1")


@app.get("/", tags=["Health"])
async def root():
    return {"message": "College ERP API is running", "docs": "/docs"}


@app.get("/health", tags=["Health"])
async def health():
    return {"status": "ok"}
