# Role System - Teacher va Student Aniqlash

## Qanday Ishlaydi?

Tizim foydalanuvchi rolini **JWT Token** orqali aniqlaydi.

## 1. Login Paytida

Foydalanuvchi login qilganda:

```python
# Backend: app/auth/routes.py
@router.post("/signin")
async def signin(credentials: UserSignIn, db: Session = Depends(get_db)):
    user = authenticate_user(db, credentials.username, credentials.password)
    
    # Token yaratiladi va ichida username saqlanadi
    access_token = utils.create_access_token(data={"sub": user.username})
    return {"access_token": access_token, "token_type": "bearer"}
```

Token ichida:
```json
{
  "sub": "username",
  "exp": 1234567890
}
```

## 2. Har Bir Request'da

Frontend har bir API request'da token yuboradi:

```typescript
// Frontend: services/courses.ts
const getAuthHeaders = () => {
  const token = getToken(); // localStorage'dan token olinadi
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};
```

## 3. Backend'da Token Dekodlash

```python
# Backend: app/auth/routes.py
def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    # Token dekodlanadi
    payload = utils.decode_token(token)
    username = payload.get("sub")
    
    # Database'dan user olinadi
    user = get_user_by_username(db, username)
    
    return user  # User object qaytariladi (ichida role bor)
```

## 4. Role Tekshirish

Har bir endpoint'da role tekshiriladi:

```python
# Backend: app/courses/routes.py
@router.post("/courses")
async def create_course(
    course: schemas.CourseCreate,
    current_user: User = Depends(get_current_user),  # Token'dan user olinadi
    db: Session = Depends(get_db)
):
    # Role tekshiriladi
    if current_user.role != UserRole.INSTRUCTOR:
        raise HTTPException(status_code=403, detail="Only instructors can create courses")
    
    # Teacher bo'lsa, kurs yaratadi
    new_course = Course(instructor_id=current_user.id, ...)
```

## User Model

```python
class User(Base):
    id = Column(Integer, primary_key=True)
    username = Column(String(50), unique=True)
    email = Column(String(100))
    role = Column(Enum(UserRole), default=UserRole.STUDENT)  # ← Bu yerda role saqlanadi
    # ...
```

## Role Turlari

```python
class UserRole(str, enum.Enum):
    STUDENT = "student"        # Talaba
    INSTRUCTOR = "instructor"  # O'qituvchi
    ADMIN = "admin"           # Administrator
```

## Frontend'da Role Tekshirish

```typescript
// Frontend: pages/teacher/courses.tsx
useEffect(() => {
  const checkUser = async () => {
    const token = getToken();
    const user = await getCurrentUser(token);
    
    // Role tekshiriladi
    if (user.role !== 'instructor') {
      router.push('/dashboard'); // Student bo'lsa, dashboard'ga yuboradi
      return;
    }
  };
}, []);
```

## Diagramma

```
1. Login
   ↓
2. Token yaratiladi (username bilan)
   ↓
3. Frontend token'ni localStorage'ga saqlaydi
   ↓
4. Har bir request'da token yuboriladi
   ↓
5. Backend token'ni dekodlaydi
   ↓
6. Database'dan user olinadi (role bilan)
   ↓
7. Role tekshiriladi
   ↓
8. Ruxsat beriladi yoki rad etiladi
```

## Muhim Nuqtalar

1. **Token ichida faqat username** - xavfsizlik uchun
2. **Role database'da saqlanadi** - har doim yangi ma'lumot
3. **Har bir request'da tekshiriladi** - real-time
4. **Frontend va Backend ikkalasida ham tekshiriladi**

## Xavfsizlik

- Token expire bo'lishi mumkin
- Token o'zgartirilmasligi kerak
- Role o'zgarganda yangi login kerak
- Database'dan to'g'ri ma'lumot olinadi

