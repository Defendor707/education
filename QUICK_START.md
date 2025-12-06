# ⚡ Tez Ishga Tushirish

## Frontend (Port 5000)

```bash
cd /home/ubuntu/proj/education/frontend
npm install
npm run dev
```

Sayt: **http://localhost:5000**

## Backend API (Port 8000)

```bash
cd /home/ubuntu/proj/education/backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python run.py
```

API: **http://localhost:8000**
Docs: **http://localhost:8000/docs**

## Telegram Bot

```bash
cd /home/ubuntu/proj/education/telegram-bot
npm install
npm start
```

## Docker Compose (Barcha Servislar)

```bash
cd /home/ubuntu/proj/education
docker-compose up -d
```

## Bot Muammosi Hal Qilish

Bot ishlamasa:

1. **Backend ishlamoqda bo'lishi kerak:**
```bash
cd /home/ubuntu/proj/education/backend
python run.py
```

2. **Bot dependencies o'rnatish:**
```bash
cd /home/ubuntu/proj/education/telegram-bot
npm install
```

3. **Botni ishga tushirish:**
```bash
npm start
```

4. **Log'larni ko'rish:**
```bash
tail -f logs/combined.log
```

## Tekshirish

- Frontend: http://localhost:5000
- Backend: http://localhost:8000/health
- API Docs: http://localhost:8000/docs
- Telegram: `/start` buyrug'ini yuboring

