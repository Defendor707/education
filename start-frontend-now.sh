#!/bin/bash
echo "🚀 Frontend ishga tushirilmoqda (port 5000)..."
cd /home/ubuntu/proj/education/frontend
if [ ! -d "node_modules" ]; then
    echo "📦 Dependencies o'rnatilmoqda..."
    npm install
fi
echo "✅ Frontend http://localhost:5000 da ochilmoqda..."
npm run dev
