#!/bin/bash
echo "🚀 Backend API ishga tushirilmoqda (port 8000)..."
cd /home/ubuntu/proj/education/backend
if [ ! -d "venv" ]; then
    echo "📦 Virtual environment yaratilmoqda..."
    python3 -m venv venv
fi
source venv/bin/activate
echo "📦 Dependencies o'rnatilmoqda..."
pip install -r requirements.txt > /dev/null 2>&1
echo "✅ Backend http://localhost:8000 da ishga tushirilmoqda..."
python run.py
