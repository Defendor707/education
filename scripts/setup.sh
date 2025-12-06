#!/bin/bash

# Education Platform Setup Script

echo "🚀 Setting up Education Platform..."

# Frontend setup
echo "📦 Installing frontend dependencies..."
cd frontend
if [ -f "package.json" ]; then
    npm install
else
    echo "⚠️  package.json not found in frontend directory"
fi
cd ..

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

echo "✅ Setup completed!"
echo ""
echo "To start development:"
echo "  Frontend: cd frontend && npm run dev"
echo "  Backend: cd backend && source venv/bin/activate && python manage.py runserver"

