from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# настройки подключения
DB_USER = "postgres"
DB_PASSWORD = "4565"
DB_HOST = "localhost"
DB_PORT = "5432"
DB_NAME = "fastapi_db"


# подключение к базе данных 
SQLALCHEMY_DATABASE_URL = f"postgresql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"

# движок SQLAlchemy
engine = create_engine(SQLALCHEMY_DATABASE_URL, echo=True)

# сессия 
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# наследование всех моделей SQLAlchemy
Base = declarative_base()

# зависимость для FastAPI
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
