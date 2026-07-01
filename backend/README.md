# College ERP System - Backend

FastAPI backend for College ERP System with role-based access control for Admin, Faculty, and Student roles.

## Tech Stack
- Python FastAPI
- PostgreSQL
- SQLAlchemy (Async)
- JWT Authentication (Access + Refresh Tokens)
- Pydantic Validation
- Uvicorn Server

## Project Structure
backend/
├── app/
│   ├── main.py
│   ├── config.py
│   ├── database/
│   │   └── connection.py
│   ├── models/
│   │   └── models.py
│   ├── schemas/
│   ├── routes/
│   ├── services/
│   ├── middleware/
│   └── utils/
├── server.py
├── requirements.txt
└── .env.example

## Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/Bhavna2918/College-ERP-System.git
cd College-ERP-System/backend
```

### 2. Create and activate virtual environment
```bash
python -m venv venv
venv\Scripts\activate
```

### 3. Install dependencies
```bash
pip install -r requirements.txt
```

### 4. Configure environment variables
```bash
copy .env.example .env
```
Open `.env` and fill in your values:
DB_HOST=localhost
DB_PORT=5432
DB_NAME=ERPDB
DB_USER=postgres
DB_PASSWORD=your_password
JWT_SECRET_KEY=your_secret_key
JWT_ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
REFRESH_TOKEN_EXPIRE_DAYS=7
APP_ENV=development
APP_HOST=0.0.0.0
APP_PORT=8000

### 5. Run the server
```bash
python server.py
```

### 6. Open Swagger docs
http://localhost:8000/docs

## API Endpoints

Base URL: `http://localhost:8000/api/v1`

### Authentication
| Method | Endpoint | Access |
|--------|----------|--------|
| POST | /auth/login | Public |
| POST | /auth/refresh | Public |
| POST | /auth/logout | Authenticated |
| POST | /auth/forgot-password | Public |
| POST | /auth/reset-password | Public |
| POST | /auth/change-password | Authenticated |
| GET | /auth/me | Authenticated |

### Students
| Method | Endpoint | Access |
|--------|----------|--------|
| POST | /students | Admin |
| GET | /students | Admin |
| GET | /students/me | Student |
| GET | /students/{id} | Admin, Faculty |
| PUT | /students/{id} | Admin |
| DELETE | /students/{id} | Admin |

### Faculty
| Method | Endpoint | Access |
|--------|----------|--------|
| POST | /faculty | Admin |
| GET | /faculty | Admin |
| GET | /faculty/{id} | Admin |
| PUT | /faculty/{id} | Admin |
| DELETE | /faculty/{id} | Admin |

### Departments
| Method | Endpoint | Access |
|--------|----------|--------|
| POST | /departments | Admin |
| GET | /departments | All |
| GET | /departments/{id} | All |
| PUT | /departments/{id} | Admin |
| DELETE | /departments/{id} | Admin |

### Courses
| Method | Endpoint | Access |
|--------|----------|--------|
| POST | /courses | Admin |
| GET | /courses | All |
| GET | /courses/{id} | All |
| PUT | /courses/{id} | Admin |
| DELETE | /courses/{id} | Admin |
| POST | /courses/enroll | Admin |

### Subjects
| Method | Endpoint | Access |
|--------|----------|--------|
| POST | /subjects | Admin |
| GET | /subjects | All |
| GET | /subjects/{id} | All |
| PUT | /subjects/{id} | Admin |
| DELETE | /subjects/{id} | Admin |

### Attendance
| Method | Endpoint | Access |
|--------|----------|--------|
| POST | /attendance | Faculty |
| POST | /attendance/bulk | Faculty |
| GET | /attendance/student/{id} | All |
| GET | /attendance/percentage/{student_id}/{subject_id} | All |
| GET | /attendance/subject/{id} | Faculty |

### Results
| Method | Endpoint | Access |
|--------|----------|--------|
| POST | /results/exams | Faculty |
| GET | /results/exams/subject/{id} | All |
| POST | /results | Faculty |
| GET | /results/student/{id} | All |
| PUT | /results/{id} | Faculty |

### Timetable
| Method | Endpoint | Access |
|--------|----------|--------|
| POST | /timetable | Admin |
| GET | /timetable/faculty/{id} | All |
| GET | /timetable/subject/{id} | All |
| PUT | /timetable/{id} | Admin |
| DELETE | /timetable/{id} | Admin |

## Roles
- **Admin** — Full access to all modules
- **Faculty** — Can mark attendance, upload results, view students
- **Student** — Can view own profile, attendance, results, timetable

## Database
- PostgreSQL database: `ERPDB`
- Schema designed by Bhavna (see `/database/schema.sql`)
- All tables use UUID primary keys, soft delete, and audit timestamps