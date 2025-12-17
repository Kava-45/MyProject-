from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import crud
from database import get_db
from schemas import UserCreate, UserOut
from typing import List

router = APIRouter()

# регистрация
@router.post("/register", response_model=UserOut)
def register_user(user: UserCreate, db: Session = Depends(get_db)):
    if crud.get_user_by_email(db, user.email):
        raise HTTPException(status_code=400, detail="Email уже зарегистрирован")
    return crud.create_user(db, user.email, user.password)

# Логин
@router.post("/login", response_model=UserOut)
def login_user(user: UserCreate, db: Session = Depends(get_db)):
    db_user = crud.authenticate_user(db, user.email, user.password)
    if not db_user:
        raise HTTPException(status_code=400, detail="Неверный email или пароль")
    return db_user

# список пользователей 
@router.get("/", response_model=List[UserOut])
def list_users(db: Session = Depends(get_db)):
    return crud.get_users(db)
