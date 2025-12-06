# Platforms Documentation

## Overview

Education Platform - bu monorepo strukturaga ega professional loyiha bo'lib, quyidagi platformalarni qo'llab-quvvatlaydi:

1. **Web Application** - Next.js/React
2. **Telegram Bot** - Node.js
3. **Desktop Application** - Electron
4. **Mobile Application** - React Native

## Web Application

### Texnologiyalar
- Next.js 14
- TypeScript
- Tailwind CSS
- React Query / SWR

### Ishlatish
```bash
cd frontend
npm install
npm run dev
```

### Build
```bash
npm run build
npm start
```

## Telegram Bot

### Texnologiyalar
- node-telegram-bot-api
- Node.js 18+
- Winston (logging)

### Ishlatish
```bash
cd telegram-bot
npm install
npm start
```

### Environment Variables
```env
TELEGRAM_BOT_TOKEN=your_bot_token
API_URL=http://localhost:8000/api
```

### Commands
- `/start` - Botni ishga tushirish
- `/courses` - Kurslar ro'yxati
- `/help` - Yordam

## Desktop Application

### Texnologiyalar
- Electron
- React
- TypeScript
- electron-builder

### Ishlatish
```bash
cd desktop
npm install
npm run dev
```

### Build
```bash
# Windows
npm run build:electron -- --win

# macOS
npm run build:electron -- --mac

# Linux
npm run build:electron -- --linux
```

### Distribution
Build qilingan fayllar `desktop/dist/` papkasida yaratiladi.

## Mobile Application

### Texnologiyalar
- React Native
- TypeScript
- React Navigation
- Redux Toolkit

### Ishlatish
```bash
cd mobile
npm install

# Android
npm run android

# iOS (macOS only)
npm run ios
```

### Requirements
- Android Studio (Android uchun)
- Xcode (iOS uchun, faqat macOS)
- Node.js 18+
- React Native CLI

## Shared Code

Barcha platformalar `shared/` papkasidagi kodlardan foydalanadi:

- `shared/types/` - TypeScript type definitions
- `shared/utils/` - Utility functions
- `shared/constants/` - Constants
- `shared/api/` - API client

## API Integration

Barcha platformalar bir xil Backend API'dan foydalanadi:

```
http://localhost:8000/api
```

### Endpoints
- `/courses` - Kurslar
- `/users` - Foydalanuvchilar
- `/auth` - Autentifikatsiya
- `/enrollments` - Ro'yxatdan o'tishlar

## Development Workflow

1. Backend'ni ishga tushiring
2. Kerakli platformani ishga tushiring
3. Shared kodlarni yangilang
4. Test qiling

## Deployment

Har bir platforma alohida deploy qilinadi:

- **Web**: Vercel / Netlify
- **Telegram Bot**: Docker container
- **Desktop**: GitHub Releases
- **Mobile**: Google Play / App Store

