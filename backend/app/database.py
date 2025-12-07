"""
Database configuration
"""
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import os

# Use SQLite for development if PostgreSQL is not available
DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "sqlite:///./education.db"  # SQLite for easy setup
)

# SQLite uchun connect_args qo'shish
if DATABASE_URL.startswith("sqlite"):
    engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
else:
    engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def get_db():
    """Database dependency"""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def init_db():
    """Initialize database tables"""
    from app.auth.models import Base
    Base.metadata.create_all(bind=engine)

