from sqlalchemy.orm import Session
from models import User, Product, CartItem
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# user 
def get_users(db: Session):
    return db.query(User).all()

def get_user_by_id(db: Session, user_id: int):
    return db.query(User).filter(User.id == user_id).first()

def get_user_by_email(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()

def create_user(db: Session, email: str, password: str):
    hashed_password = pwd_context.hash(password)
    new_user = User(email=email, hashed_password=hashed_password)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

def authenticate_user(db: Session, email: str, password: str):
    user = get_user_by_email(db, email)
    if not user:
        return None
    if not pwd_context.verify(password, user.hashed_password):
        return None
    return user

# === PRODUCTS ===
def get_products(db: Session):
    return db.query(Product).all()

def create_product(db: Session, product_data):
    product = Product(
        badge=product_data.badge,
        brand=product_data.brand,
        title=product_data.title,
        volume=product_data.volume,
        description=product_data.description,
        deliveryDate=product_data.deliveryDate,
        availability=product_data.availability,
        oldPrice=product_data.oldPrice,
        currentPrice=product_data.currentPrice
    )
    db.add(product)
    db.commit()
    db.refresh(product)
    return product

# === CART ===
def get_cart(db: Session, user_id: int):
    return db.query(CartItem).filter(CartItem.user_id == user_id).all()

def add_to_cart(db: Session, user_id: int, item):
    cart_item = CartItem(
        user_id=user_id,
        product_id=item.product_id,
        quantity=item.quantity
    )
    db.add(cart_item)
    db.commit()
    db.refresh(cart_item)
    return cart_item

def remove_from_cart(db: Session, user_id: int, cart_item_id: int):
    item = db.query(CartItem).filter(
        CartItem.id == cart_item_id,
        CartItem.user_id == user_id
    ).first()
    if not item:
        return None
    db.delete(item)
    db.commit()
    return item
