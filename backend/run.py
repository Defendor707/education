"""
Run the application
"""
import uvicorn
from app.main import app
from app.database import init_db
from app.auth.create_default_user import create_guest_user

if __name__ == "__main__":
    # Initialize database
    init_db()
    
    # Default guest user yaratish
    try:
        create_guest_user()
    except Exception as e:
        print(f"⚠️  Guest user yaratishda xatolik (ehtimol allaqachon mavjud): {e}")
    
    # Run the application
    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=8000,
        reload=True
    )

