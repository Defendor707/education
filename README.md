# Education Platform

Professional education platform - katta va kengaytiriladigan loyiha.

## 📁 Struktura

```
education/
├── frontend/          # Frontend application (React/Next.js)
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── utils/         # Utility functions
│   │   ├── hooks/         # Custom React hooks
│   │   ├── services/      # API services
│   │   ├── store/         # State management
│   │   ├── styles/        # CSS/SCSS files
│   │   └── assets/        # Images, fonts, etc.
│   └── public/            # Static files
│
├── backend/           # Backend API (Django/FastAPI/Node.js)
│   ├── app/          # Main application
│   │   ├── auth/     # Authentication module
│   │   ├── courses/  # Courses module
│   │   ├── users/    # Users module
│   │   ├── payments/ # Payment module
│   │   └── admin/    # Admin panel
│   ├── api/          # API routes
│   ├── models/       # Data models
│   ├── services/     # Business logic
│   ├── middleware/   # Custom middleware
│   └── utils/        # Utility functions
│
├── database/         # Database related files
│   ├── migrations/   # Database migrations
│   └── seeds/        # Seed data
│
├── config/           # Configuration files
│   ├── dev/          # Development configs
│   ├── prod/         # Production configs
│   └── test/         # Test configs
│
├── docs/             # Documentation
├── scripts/          # Utility scripts
└── tests/            # Integration tests

```

## 🚀 Boshlash

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Backend
```bash
cd backend
pip install -r requirements.txt
python manage.py runserver
```

## 🛠️ Texnologiyalar

- **Frontend**: React/Next.js, TypeScript, Tailwind CSS
- **Backend**: Django/FastAPI/Node.js
- **Database**: PostgreSQL/MySQL
- **State Management**: Redux/Zustand
- **Testing**: Jest, Pytest

## 📝 Development Guidelines

- Kod yozishdan oldin branch yarating
- Commit message'larni aniq yozing
- Code review qiling
- Test yozing

## 📄 License

MIT

