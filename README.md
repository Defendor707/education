# Education Platform

Professional education platform - katta va kengaytiriladigan loyiha. Monorepo struktura bilan barcha platformalar uchun.

## 📁 Struktura

```
education/
├── frontend/          # Web Application (React/Next.js)
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
├── telegram-bot/     # Telegram Bot Application
│   ├── src/
│   │   ├── commands/     # Bot commands
│   │   ├── handlers/     # Message handlers
│   │   ├── services/     # Business logic
│   │   ├── middleware/   # Middleware
│   │   └── utils/        # Utilities
│   └── config/           # Configuration
│
├── desktop/          # Desktop Application (Electron)
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── utils/         # Utilities
│   │   ├── services/      # API services
│   │   └── store/         # State management
│   ├── public/            # Electron main process
│   └── resources/         # Icons, assets
│
├── mobile/           # Mobile Application (React Native)
│   ├── src/
│   │   ├── screens/       # App screens
│   │   ├── components/    # Reusable components
│   │   ├── navigation/    # Navigation config
│   │   ├── services/      # API services
│   │   ├── store/         # State management
│   │   └── utils/         # Utilities
│   └── assets/            # Images, fonts
│
├── shared/           # Shared code across platforms
│   ├── types/         # TypeScript types
│   ├── utils/         # Shared utilities
│   ├── constants/     # Shared constants
│   └── api/           # Shared API client
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

### Backend (API)
```bash
cd backend
pip install -r requirements.txt
python manage.py runserver
```

### Web Application
```bash
cd frontend
npm install
npm run dev
```

### Telegram Bot
```bash
cd telegram-bot
npm install
npm start
```

### Desktop Application
```bash
cd desktop
npm install
npm run dev
```

### Mobile Application
```bash
cd mobile
npm install
npm run android  # yoki npm run ios
```

### Docker (Barcha servislar)
```bash
docker-compose up -d
```

## 🛠️ Texnologiyalar

### Backend
- **Framework**: Django/FastAPI/Node.js
- **Database**: PostgreSQL
- **Testing**: Pytest, Jest

### Frontend (Web)
- **Framework**: Next.js/React
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Redux/Zustand

### Telegram Bot
- **Framework**: node-telegram-bot-api
- **Language**: JavaScript/TypeScript
- **Logging**: Winston

### Desktop
- **Framework**: Electron
- **Frontend**: React
- **Language**: TypeScript
- **Build**: electron-builder

### Mobile
- **Framework**: React Native
- **Language**: TypeScript
- **Navigation**: React Navigation
- **State Management**: Redux Toolkit

## 📝 Development Guidelines

- Kod yozishdan oldin branch yarating
- Commit message'larni aniq yozing
- Code review qiling
- Test yozing

## 📄 License

MIT

