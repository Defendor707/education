#!/bin/bash
echo "🚀 Telegram Bot ishga tushirilmoqda..."
cd /home/ubuntu/proj/education/telegram-bot
if [ ! -d "node_modules" ]; then
    echo "📦 Dependencies o'rnatilmoqda..."
    npm install
fi
mkdir -p logs
echo "✅ Bot ishga tushirilmoqda..."
npm start
