from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Настройки подключения
DB_USER = "postgres"
DB_PASSWORD = "4565"
DB_HOST = "localhost"
DB_PORT = "5432"
DB_NAME = "fastapi_db"

SQLALCHEMY_DATABASE_URL = f"postgresql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"

# Движок SQLAlchemy
engine = create_engine(SQLALCHEMY_DATABASE_URL, echo=True)

# Сессии
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Базовый класс моделей
Base = declarative_base()

# Зависимость для FastAPI
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
