# Deployment Guide

## Docker Deployment

### Development
```bash
docker-compose up -d
```

### Production
```bash
docker-compose -f docker-compose.prod.yml up -d
```

## GitHub Container Registry

Docker images are automatically built and pushed to GitHub Container Registry:

- Frontend: `ghcr.io/defendor707/education-frontend:latest`
- Backend: `ghcr.io/defendor707/education-backend:latest`

### Pull and Run Images

```bash
# Login to GitHub Container Registry
echo $GITHUB_TOKEN | docker login ghcr.io -u USERNAME --password-stdin

# Pull images
docker pull ghcr.io/defendor707/education-frontend:latest
docker pull ghcr.io/defendor707/education-backend:latest
```

## CI/CD Pipeline

### GitHub Actions Workflows

1. **CI Pipeline** (`.github/workflows/ci.yml`)
   - Runs on every push and pull request
   - Tests frontend and backend
   - Builds Docker images
   - Pushes to GitHub Container Registry

2. **Docker Build** (`.github/workflows/docker-build.yml`)
   - Builds and pushes Docker images on main branch
   - Creates tags for releases

3. **Release** (`.github/workflows/release.yml`)
   - Creates release notes
   - Tags Docker images with version

### Required GitHub Secrets

For deployment, you may need to set these secrets in GitHub:

- `DEPLOY_HOST` - Deployment server host
- `DEPLOY_USER` - SSH user
- `DEPLOY_KEY` - SSH private key
- `POSTGRES_PASSWORD` - Database password
- `SECRET_KEY` - Application secret key

## Environment Variables

Create `.env` file for production:

```env
POSTGRES_DB=education_db
POSTGRES_USER=education_user
POSTGRES_PASSWORD=your_secure_password
SECRET_KEY=your_secret_key
DEBUG=False
NEXT_PUBLIC_API_URL=https://api.yourdomain.com/api
```

## Health Checks

All services include health checks:
- Backend: `http://localhost:8000/health`
- Frontend: `http://localhost:3000`

## Monitoring

Consider adding:
- Prometheus for metrics
- Grafana for visualization
- Sentry for error tracking
- Log aggregation (ELK stack)

