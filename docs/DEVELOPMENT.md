# Development Guide

## Local Development Setup

### Prerequisites
- Node.js 18+ 
- Python 3.11+
- PostgreSQL 15+
- Git

### Initial Setup

1. Clone repository
```bash
git clone <repository-url>
cd education
```

2. Run setup script
```bash
./scripts/setup.sh
```

3. Configure environment variables
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. Start database
```bash
docker-compose up db -d
```

5. Run migrations
```bash
cd backend
python manage.py migrate
```

6. Start development servers

Frontend:
```bash
cd frontend
npm run dev
```

Backend:
```bash
cd backend
source venv/bin/activate
python manage.py runserver
```

## Code Style

### Frontend
- Use TypeScript
- Follow React best practices
- Use functional components with hooks
- Write tests for components

### Backend
- Follow PEP 8 for Python
- Use type hints
- Write docstrings
- Write unit tests

## Git Workflow

1. Create feature branch
```bash
git checkout -b feature/your-feature-name
```

2. Make changes and commit
```bash
git add .
git commit -m "feat: add your feature"
```

3. Push and create pull request
```bash
git push origin feature/your-feature-name
```

## Testing

### Frontend Tests
```bash
cd frontend
npm test
```

### Backend Tests
```bash
cd backend
pytest
```

## Deployment

See `docs/DEPLOYMENT.md` for deployment instructions.

