#!/bin/bash

# Barcha servislarni ishga tushirish

echo "🚀 Education Platform - Barcha servislarni ishga tushirish"
echo "============================================================"

cd "$(dirname "$0")/.."

# Backend'ni tekshirish va ishga tushirish
echo ""
echo "1️⃣ Backend API tekshirilmoqda..."
if ! curl -s http://localhost:8000/health > /dev/null 2>&1; then
    echo "⚠️  Backend ishlamayapti. Ishga tushirilmoqda..."
    cd backend
    if [ ! -d "venv" ]; then
        python3 -m venv venv
    fi
    source venv/bin/activate
    pip install -r requirements.txt > /dev/null 2>&1
    python run.py &
    BACKEND_PID=$!
    echo "✅ Backend ishga tushirildi (PID: $BACKEND_PID)"
    sleep 3
    cd ..
else
    echo "✅ Backend allaqachon ishlayapti"
fi

# Frontend'ni ishga tushirish
echo ""
echo "2️⃣ Frontend ishga tushirilmoqda (port 5000)..."
cd frontend
if [ ! -d "node_modules" ]; then
    echo "📦 Dependencies o'rnatilmoqda..."
    npm install
fi
echo "✅ Frontend http://localhost:5000 da ishga tushirilmoqda..."
npm run dev &
FRONTEND_PID=$!
cd ..

# Telegram Bot'ni tekshirish
echo ""
echo "3️⃣ Telegram Bot tekshirilmoqda..."
./scripts/check-bot.sh

echo ""
echo "============================================================"
echo "✅ Barcha servislar ishga tushirildi!"
echo ""
echo "📍 Frontend: http://localhost:5000"
echo "📍 Backend API: http://localhost:8000"
echo "📍 API Docs: http://localhost:8000/docs"
echo ""
echo "To'xtatish uchun: Ctrl+C yoki kill $BACKEND_PID $FRONTEND_PID"

