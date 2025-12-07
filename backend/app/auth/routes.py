"""
Authentication routes
"""
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from app.auth import schemas, utils
from app.auth.models import User, UserRole
from app.database import get_db

router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/login")

def get_user_by_username(db: Session, username: str):
    """Get user by username"""
    return db.query(User).filter(User.username == username).first()

def get_user_by_email(db: Session, email: str):
    """Get user by email"""
    return db.query(User).filter(User.email == email).first()

def authenticate_user(db: Session, username: str, password: str):
    """Authenticate user"""
    user = get_user_by_username(db, username)
    if not user:
        return False
    if not utils.verify_password(password, user.hashed_password):
        return False
    return user

def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    """
    Get current authenticated user from JWT token
    
    Bu funksiya:
    1. Token'ni dekodlaydi
    2. Token ichidagi username'ni oladi
    3. Database'dan user'ni topadi
    4. User object'ni qaytaradi (ichida role bor)
    """
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    
    # 1. Token dekodlash
    payload = utils.decode_token(token)
    if payload is None:
        raise credentials_exception
    
    # 2. Username olish
    username: str = payload.get("sub")
    if username is None:
        raise credentials_exception
    
    # 3. Database'dan user olish (role bilan birga)
    user = get_user_by_username(db, username)
    if user is None:
        raise credentials_exception
    
    # 4. User object qaytarish (user.role mavjud)
    return user

def require_role(allowed_roles: list[UserRole]):
    """
    Decorator for role-based access control
    
    Foydalanish:
    @require_role([UserRole.INSTRUCTOR])
    async def create_course(...):
        ...
    """
    def decorator(func):
        async def wrapper(*args, **kwargs):
            # current_user ni topish
            current_user = None
            for arg in args:
                if isinstance(arg, User):
                    current_user = arg
                    break
            for key, value in kwargs.items():
                if isinstance(value, User):
                    current_user = value
                    break
            
            if not current_user:
                raise HTTPException(
                    status_code=status.HTTP_401_UNAUTHORIZED,
                    detail="User not authenticated"
                )
            
            if current_user.role not in allowed_roles:
                raise HTTPException(
                    status_code=status.HTTP_403_FORBIDDEN,
                    detail=f"Access denied. Required roles: {[r.value for r in allowed_roles]}"
                )
            
            return await func(*args, **kwargs)
        return wrapper
    return decorator

@router.post("/signup", response_model=schemas.UserResponse, status_code=status.HTTP_201_CREATED)
async def signup(user_data: schemas.UserSignUp, db: Session = Depends(get_db)):
    """Create new user account"""
    # Check if username exists
    if get_user_by_username(db, user_data.username):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Username already registered"
        )
    
    # Check if email exists
    if get_user_by_email(db, user_data.email):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    # Create new user (default role: STUDENT)
    hashed_password = utils.get_password_hash(user_data.password)
    new_user = User(
        username=user_data.username,
        email=user_data.email,
        first_name=user_data.first_name,
        last_name=user_data.last_name,
        hashed_password=hashed_password,
        role=UserRole.STUDENT  # Default role
    )
    
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    
    return new_user

@router.post("/login", response_model=schemas.Token)
async def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):
    """Login and get access token"""
    user = authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="User account is inactive"
        )
    
    # Token yaratiladi - ichida username saqlanadi
    # Role database'da saqlanadi, token'da emas (xavfsizlik uchun)
    access_token = utils.create_access_token(data={"sub": user.username})
    return {"access_token": access_token, "token_type": "bearer"}

@router.post("/signin", response_model=schemas.Token)
async def signin(credentials: schemas.UserSignIn, db: Session = Depends(get_db)):
    """Alternative login endpoint (signin)"""
    user = authenticate_user(db, credentials.username, credentials.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
        )
    
    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="User account is inactive"
        )
    
    # Token yaratiladi
    access_token = utils.create_access_token(data={"sub": user.username})
    return {"access_token": access_token, "token_type": "bearer"}

@router.get("/me", response_model=schemas.UserProfile)
async def get_current_user_profile(current_user: User = Depends(get_current_user)):
    """
    Get current user profile
    
    Bu endpoint'da:
    - Token'dan user olinadi (get_current_user orqali)
    - User object'da role mavjud
    - Frontend'ga user.role yuboriladi
    """
    return current_user

@router.post("/logout")
async def logout():
    """Logout (client should remove token)"""
    return {"message": "Successfully logged out"}
