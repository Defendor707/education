#!/bin/bash

# Education Platform - All Platforms Setup Script

echo "🚀 Setting up Education Platform (All Platforms)..."

# Backend setup
echo "📦 Installing backend dependencies..."
cd backend
if [ -f "requirements.txt" ]; then
    python3 -m venv venv
    source venv/bin/activate
    pip install -r requirements.txt
else
    echo "⚠️  requirements.txt not found in backend directory"
fi
cd ..

# Frontend setup
echo "📦 Installing frontend dependencies..."
cd frontend
if [ -f "package.json" ]; then
    npm install
else
    echo "⚠️  package.json not found in frontend directory"
fi
cd ..

# Telegram Bot setup
echo "📦 Installing telegram-bot dependencies..."
cd telegram-bot
if [ -f "package.json" ]; then
    npm install
else
    echo "⚠️  package.json not found in telegram-bot directory"
fi
cd ..

# Desktop setup
echo "📦 Installing desktop dependencies..."
cd desktop
if [ -f "package.json" ]; then
    npm install
else
    echo "⚠️  package.json not found in desktop directory"
fi
cd ..

# Mobile setup
echo "📦 Installing mobile dependencies..."
cd mobile
if [ -f "package.json" ]; then
    npm install
else
    echo "⚠️  package.json not found in mobile directory"
fi
cd ..

echo "✅ Setup completed!"
echo ""
echo "To start development:"
echo "  Backend: cd backend && source venv/bin/activate && python manage.py runserver"
echo "  Frontend: cd frontend && npm run dev"
echo "  Telegram Bot: cd telegram-bot && npm start"
echo "  Desktop: cd desktop && npm run dev"
echo "  Mobile: cd mobile && npm run android (or ios)"

