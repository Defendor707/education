# GitHub Actions Setup Guide

## CI/CD Workflows

Bu loyihada 4 ta GitHub Actions workflow mavjud:

### 1. CI Pipeline (`ci.yml`)
Har bir push va pull request'da ishlaydi:
- Frontend va Backend testlarni ishga tushiradi
- Docker image'larni build qiladi
- GitHub Container Registry'ga push qiladi

### 2. Docker Build (`docker-build.yml`)
Main branch'ga push qilinganda:
- Production-ready Docker image'larni build qiladi
- Version tag'larni yaratadi
- Latest tag'ni yangilaydi

### 3. Release (`release.yml`)
Release yaratilganda:
- Release notes yaratadi
- Docker image'larni version bilan tag qiladi

### 4. Deploy (`deploy.yml`)
Production'ga deploy qilish uchun (optional):
- Server'ga SSH orqali ulanish
- Docker compose orqali deploy qilish

## GitHub Secrets Sozlash

Repository Settings > Secrets and variables > Actions'da quyidagi secret'larni qo'shing:

### Deployment uchun (agar kerak bo'lsa):
- `DEPLOY_HOST` - Server IP yoki domain
- `DEPLOY_USER` - SSH foydalanuvchi nomi
- `DEPLOY_KEY` - SSH private key

### Application uchun:
- `POSTGRES_PASSWORD` - Database paroli
- `SECRET_KEY` - Django/FastAPI secret key
- `JWT_SECRET_KEY` - JWT token secret

## GitHub Container Registry

Docker image'lar avtomatik ravishda GitHub Container Registry'ga push qilinadi:
- `ghcr.io/defendor707/education-frontend`
- `ghcr.io/defendor707/education-backend`

### Image'larni pull qilish:

```bash
# GitHub token bilan login qiling
echo $GITHUB_TOKEN | docker login ghcr.io -u Defendor707 --password-stdin

# Image'larni pull qiling
docker pull ghcr.io/defendor707/education-frontend:latest
docker pull ghcr.io/defendor707/education-backend:latest
```

## Workflow Trigger Qilish

### Manual trigger:
```bash
git push origin main
```

### Specific branch:
```bash
git push origin develop
```

### Release yaratish:
1. GitHub'da Releases > New release
2. Tag version yarating (v1.0.0)
3. Release notes yozing
4. Publish qiling

## Monitoring

GitHub Actions'da workflow'larni kuzatish:
- Actions tab'da barcha workflow run'larini ko'rish
- Har bir step'ning log'larini ko'rish
- Failed step'larni debug qilish

