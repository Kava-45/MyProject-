from pydantic import BaseModel, EmailStr, Field

# Users 
class UserCreate(BaseModel):
    email: EmailStr
    password: str = Field(min_length=6, max_length=30)

class UserOut(BaseModel):
    id: int
    email: EmailStr

    class Config:
        from_attributes = True

# Products 
class ProductBase(BaseModel):
    badge: str | None = None
    brand: str
    title: str
    volume: str
    description: str
    deliveryDate: str
    availability: str
    oldPrice: str | None = None
    currentPrice: str

class ProductCreate(ProductBase):
    pass

class ProductOut(ProductBase):
    id: int

    class Config:
        from_attributes = True

# Cart
class CartItemBase(BaseModel):
    product_id: int
    quantity: int = 1

class CartItemCreate(CartItemBase):
    pass

class CartItemOut(BaseModel):
    id: int
    product_id: int
    quantity: int

    class Config:
        from_attributes = True
