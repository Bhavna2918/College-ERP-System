from pydantic import BaseModel


class DepartmentCreate(BaseModel):
    department_name: str
    department_code: str
    campus_id: str | None = None


class DepartmentUpdate(BaseModel):
    department_name: str | None = None
    department_code: str | None = None


class DepartmentOut(BaseModel):
    id: str
    department_name: str
    department_code: str
    campus_id: str | None = None

    class Config:
        from_attributes = True