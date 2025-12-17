from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
import crud
from database import get_db
from schemas import CartItemCreate, CartItemOut
from typing import List

router = APIRouter()


# товар в корзине 
@router.get("/", response_model=List[CartItemOut])
def get_user_cart(user_id: int = Query(...), db: Session = Depends(get_db)):
    return crud.get_cart(db, user_id)

# добавление товара 
@router.post("/", response_model=CartItemOut)
def add_item_to_cart(item: CartItemCreate, user_id: int = Query(...), db: Session = Depends(get_db)):
    return crud.add_to_cart(db, user_id, item)

# удаление товара 
@router.delete("/{cart_item_id}")
def delete_cart_item(cart_item_id: int, user_id: int = Query(...), db: Session = Depends(get_db)):
    removed_item = crud.remove_from_cart(db, user_id, cart_item_id)
    if not removed_item:
        raise HTTPException(status_code=404, detail="Товар не найден")
    return {"detail": "Товар удален"}
