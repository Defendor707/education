#!/bin/bash

# Telegram Bot ishga tushirish skripti

echo "🚀 Telegram Bot ishga tushirilmoqda..."

cd "$(dirname "$0")/../telegram-bot"

# .env fayl mavjudligini tekshirish
if [ ! -f .env ]; then
    echo "⚠️  .env fayl topilmadi. .env.example dan nusxa olinmoqda..."
    cp .env.example .env
    echo "❌ Iltimos, .env faylga TELEGRAM_BOT_TOKEN qo'shing!"
    exit 1
fi

# Node modules mavjudligini tekshirish
if [ ! -d "node_modules" ]; then
    echo "📦 Dependencies o'rnatilmoqda..."
    npm install
fi

# Logs papkasini yaratish
mkdir -p logs

# Botni ishga tushirish
echo "✅ Bot ishga tushirilmoqda..."
npm start

