#!/bin/bash

# Barcha servislarni tez ishga tushirish

echo "🚀 Education Platform - Quick Start"
echo "===================================="

cd "$(dirname "$0")/.."

# .env fayl mavjudligini tekshirish
if [ ! -f .env ]; then
    echo "📝 .env fayl yaratilmoqda..."
    cat > .env << EOF
TELEGRAM_BOT_TOKEN=7552111773:AAGxv82bROMss57jnzd5NOoCqwIwqjZl4ac
API_URL=http://localhost:8000/api
DATABASE_URL=postgresql://education_user:education_password@localhost:5432/education_db
SECRET_KEY=your-secret-key-change-in-production
DEBUG=True
EOF
fi

# Telegram bot .env
if [ ! -f telegram-bot/.env ]; then
    echo "📝 Telegram bot .env fayl yaratilmoqda..."
    cat > telegram-bot/.env << EOF
TELEGRAM_BOT_TOKEN=7552111773:AAGxv82bROMss57jnzd5NOoCqwIwqjZl4ac
API_URL=http://localhost:8000/api
BOT_NAME=Education Bot
LOG_LEVEL=info
EOF
fi

echo ""
echo "Ishga tushirish usullari:"
echo "1. Docker Compose (tavsiya): docker-compose up -d"
echo "2. Telegram Bot: cd telegram-bot && npm install && npm start"
echo "3. Backend: cd backend && pip install -r requirements.txt && python run.py"
echo "4. Frontend: cd frontend && npm install && npm run dev"
echo ""
echo "Telegram Bot token: 7552111773:AAGxv82bROMss57jnzd5NOoCqwIwqjZl4ac"
echo ""

