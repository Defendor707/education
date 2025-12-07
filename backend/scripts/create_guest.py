#!/usr/bin/env python3
"""
Standalone script to create guest user
"""
import sys
import os

# Add parent directory to path
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.database import SessionLocal, init_db
from app.auth.models import User, UserRole
from app.auth.utils import get_password_hash

def create_guest_user():
    """Default guest user yaratish"""
    db = SessionLocal()
    
    try:
        # Database'ni initialize qilish
        init_db()
        
        # Guest user mavjudligini tekshirish
        existing_user = db.query(User).filter(User.username == "guest").first()
        
        if existing_user:
            print("✅ Guest user allaqachon mavjud")
            print(f"   Username: {existing_user.username}")
            print(f"   Email: {existing_user.email}")
            return existing_user
        
        # Yangi guest user yaratish
        hashed_password = get_password_hash("guest")
        guest_user = User(
            username="guest",
            email="guest@education.local",
            first_name="Guest",
            last_name="User",
            hashed_password=hashed_password,
            role=UserRole.STUDENT,
            is_active=True
        )
        
        db.add(guest_user)
        db.commit()
        db.refresh(guest_user)
        
        print("✅ Guest user muvaffaqiyatli yaratildi!")
        print(f"   Username: guest")
        print(f"   Password: guest")
        print(f"   Email: guest@education.local")
        print(f"   Role: student")
        
        return guest_user
        
    except Exception as e:
        db.rollback()
        print(f"❌ Xatolik: {e}")
        import traceback
        traceback.print_exc()
        raise
    finally:
        db.close()

if __name__ == "__main__":
    create_guest_user()

