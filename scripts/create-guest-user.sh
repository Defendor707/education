#!/bin/bash

# Guest user yaratish skripti

echo "👤 Guest user yaratilmoqda..."

cd "$(dirname "$0")/../backend"

# Virtual environment tekshirish
if [ ! -d "venv" ]; then
    echo "📦 Virtual environment yaratilmoqda..."
    python3 -m venv venv
fi

source venv/bin/activate

# Dependencies tekshirish
if ! python -c "import fastapi" 2>/dev/null; then
    echo "📦 Dependencies o'rnatilmoqda..."
    pip install -r requirements.txt > /dev/null 2>&1
fi

# Guest user yaratish
echo "🔧 Guest user yaratilmoqda..."
python -c "
from app.database import SessionLocal, init_db
from app.auth.models import User, UserRole
from app.auth.utils import get_password_hash

db = SessionLocal()
try:
    init_db()
    existing = db.query(User).filter(User.username == 'guest').first()
    if existing:
        print('✅ Guest user allaqachon mavjud')
    else:
        hashed = get_password_hash('guest')
        guest = User(
            username='guest',
            email='guest@education.local',
            first_name='Guest',
            last_name='User',
            hashed_password=hashed,
            role=UserRole.STUDENT,
            is_active=True
        )
        db.add(guest)
        db.commit()
        print('✅ Guest user muvaffaqiyatli yaratildi!')
        print('   Username: guest')
        print('   Password: guest')
except Exception as e:
    db.rollback()
    print(f'❌ Xatolik: {e}')
finally:
    db.close()
"

echo ""
echo "✅ Guest user tayyor!"
echo "   Login: guest"
echo "   Password: guest"

