from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
import crud
from schemas import ProductCreate, ProductOut
from typing import List

router = APIRouter()


# получаем все товары 
@router.get("/", response_model=List[ProductOut])
def get_all_products(db: Session = Depends(get_db)):
    products = crud.get_products(db)
    return products


# добавление товара 
@router.post("/", response_model=ProductOut)
def add_product(product: ProductCreate, db: Session = Depends(get_db)):
    created = crud.create_product(db, product)
    if not created:
        raise HTTPException(status_code=400, detail="Ошибка создания товара")
    return created
