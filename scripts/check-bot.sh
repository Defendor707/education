#!/bin/bash

# Telegram Bot holatini tekshirish

echo "🔍 Telegram Bot holatini tekshirish..."
echo ""

cd "$(dirname "$0")/../telegram-bot"

# .env fayl tekshirish
if [ ! -f .env ]; then
    echo "❌ .env fayl topilmadi!"
    echo "📝 .env fayl yaratilmoqda..."
    cat > .env << EOF
TELEGRAM_BOT_TOKEN=7552111773:AAGxv82bROMss57jnzd5NOoCqwIwqjZl4ac
API_URL=http://localhost:8000/api
BOT_NAME=Education Bot
LOG_LEVEL=info
EOF
    echo "✅ .env fayl yaratildi"
fi

# Token tekshirish
if grep -q "TELEGRAM_BOT_TOKEN" .env; then
    TOKEN=$(grep TELEGRAM_BOT_TOKEN .env | cut -d '=' -f2)
    if [ -n "$TOKEN" ] && [ "$TOKEN" != "your_telegram_bot_token_here" ]; then
        echo "✅ Token mavjud: ${TOKEN:0:20}..."
    else
        echo "❌ Token to'ldirilmagan!"
    fi
else
    echo "❌ Token topilmadi!"
fi

# Backend API tekshirish
echo ""
echo "🔍 Backend API tekshirilmoqda..."
if curl -s http://localhost:8000/health > /dev/null 2>&1; then
    echo "✅ Backend API ishlayapti (http://localhost:8000)"
else
    echo "❌ Backend API ishlamayapti!"
    echo "   Backend'ni ishga tushiring: cd backend && python run.py"
fi

# Node modules tekshirish
echo ""
if [ -d "node_modules" ]; then
    echo "✅ Dependencies o'rnatilgan"
else
    echo "⚠️  Dependencies o'rnatilmagan"
    echo "   npm install qiling"
fi

# Log fayllar
echo ""
if [ -d "logs" ]; then
    echo "📋 Log fayllar:"
    ls -lh logs/ 2>/dev/null | tail -5
else
    echo "⚠️  Logs papkasi topilmadi"
fi

echo ""
echo "Botni ishga tushirish:"
echo "  npm start"
echo "  yoki"
echo "  docker-compose up telegram-bot"

