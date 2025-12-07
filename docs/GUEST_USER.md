# Guest User

## Default Foydalanuvchi

Platformada har doim mavjud bo'lgan default foydalanuvchi:

- **Username**: `guest`
- **Password**: `guest`
- **Email**: `guest@education.local`
- **Role**: `student`

## Guest User Yaratish

### 1. Backend ishga tushirilganda avtomatik

Backend ishga tushirilganda avtomatik ravishda guest user yaratiladi (agar mavjud bo'lmasa).

```bash
cd backend
python run.py
```

### 2. Manual yaratish

```bash
cd /home/ubuntu/proj/education/backend
python3 create_guest_simple.py
```

Yoki:

```bash
cd /home/ubuntu/proj/education
./scripts/create-guest-user.sh
```

### 3. API orqali yaratish

```bash
curl -X POST http://localhost:8000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "username": "guest",
    "email": "guest@education.local",
    "password": "guest",
    "first_name": "Guest",
    "last_name": "User"
  }'
```

## Kirish

### Web Sayt
1. http://localhost:5000/signin oching
2. Username: `guest`
3. Password: `guest`
4. "Kirish" tugmasini bosing

### Telegram Bot
```
/signin guest guest
```

### API
```bash
curl -X POST http://localhost:8000/api/auth/signin \
  -H "Content-Type: application/json" \
  -d '{
    "username": "guest",
    "password": "guest"
  }'
```

## Xavfsizlik

⚠️ **Eslatma**: Guest user faqat test va development uchun. Production'da bu userni o'chirish yoki parolini o'zgartirish tavsiya etiladi.

