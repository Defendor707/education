#!/bin/bash

# Frontend ishga tushirish skripti (5000 portda)

echo "🚀 Frontend ishga tushirilmoqda (port 5000)..."

cd "$(dirname "$0")/../frontend"

# Node modules mavjudligini tekshirish
if [ ! -d "node_modules" ]; then
    echo "📦 Dependencies o'rnatilmoqda..."
    npm install
fi

# Frontend'ni 5000 portda ishga tushirish
echo "✅ Frontend http://localhost:5000 da ishga tushirilmoqda..."
npm run dev

