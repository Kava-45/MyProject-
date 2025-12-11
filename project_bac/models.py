from sqlalchemy import Column, Integer, String, Float, ForeignKey
from sqlalchemy.orm import relationship
from database import Base

# Users
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)

# Products
class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    badge = Column(String, nullable=True)
    brand = Column(String, nullable=False)
    title = Column(String, nullable=False)
    volume = Column(String, nullable=False)
    description = Column(String, nullable=False)
    deliveryDate = Column(String, nullable=False)
    availability = Column(String, nullable=False)
    oldPrice = Column(String, nullable=True)
    currentPrice = Column(String, nullable=False)

# Cart Items
class CartItem(Base):
    __tablename__ = "cart_items"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    product_id = Column(Integer, ForeignKey("products.id"))
    quantity = Column(Integer, default=1)

    user = relationship("User")
    product = relationship("Product")
