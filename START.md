# 🚀 Ishga Tushirish Qo'llanmasi

## Telegram Bot Token
```
7552111773:AAGxv82bROMss57jnzd5NOoCqwIwqjZl4ac
```

## ⚡ Tez Ishga Tushirish

### 1️⃣ Barcha Servislarni Birga (Tavsiya)

```bash
cd /home/ubuntu/proj/education
./scripts/start-all.sh
```

Bu quyidagilarni ishga tushiradi:
- Backend API (port 8000)
- Frontend (port 5000)
- Telegram Bot holatini tekshiradi

### 2️⃣ Docker Compose (Eng Oson)

```bash
cd /home/ubuntu/proj/education

# Barcha servislarni ishga tushirish
docker-compose up -d

# Status tekshirish
docker-compose ps

# Log'larni ko'rish
docker-compose logs -f

# Faqat frontend
docker-compose up frontend

# Faqat telegram-bot
docker-compose up telegram-bot
```

### 3️⃣ Alohida Ishga Tushirish

#### Frontend (Port 5000)
```bash
cd /home/ubuntu/proj/education/frontend
npm install
npm run dev
# http://localhost:5000
```

#### Backend API
```bash
cd /home/ubuntu/proj/education/backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python run.py
# http://localhost:8000
```

#### Telegram Bot
```bash
cd /home/ubuntu/proj/education/telegram-bot
npm install
npm start
```

## 📍 Portlar

- **Frontend**: http://localhost:5000
- **Backend API**: http://localhost:8000
- **API Docs**: http://localhost:8000/docs
- **Database**: localhost:5432

## 🔍 Telegram Bot Tekshirish

```bash
cd /home/ubuntu/proj/education
./scripts/check-bot.sh
```

Bu skript quyidagilarni tekshiradi:
- Token mavjudligi
- Backend API ulanishi
- Dependencies
- Log fayllar

## 🐛 Bot Muammolari

### Bot ishlamayapti

1. **Token tekshirish:**
```bash
cd /home/ubuntu/proj/education/telegram-bot
cat .env | grep TELEGRAM_BOT_TOKEN
```

2. **Backend API tekshirish:**
```bash
curl http://localhost:8000/health
```

3. **Log'larni ko'rish:**
```bash
cd /home/ubuntu/proj/education/telegram-bot
tail -f logs/combined.log
tail -f logs/error.log
```

4. **Botni qayta ishga tushirish:**
```bash
cd /home/ubuntu/proj/education/telegram-bot
npm start
```

### Backend ulanmayapti

1. Backend ishlayotganini tekshiring:
```bash
curl http://localhost:8000/health
```

2. Backend'ni ishga tushiring:
```bash
cd /home/ubuntu/proj/education/backend
python run.py
```

3. Docker orqali:
```bash
docker-compose up backend
```

## 📱 Bot Buyruqlari

- `/start` - Botni ishga tushirish
- `/signup username email password first_name last_name` - Ro'yxatdan o'tish
- `/signin username password` - Kirish
- `/courses` - Kurslar ro'yxati

## 🌐 Web Sayt

Frontend endi **5000 portda** ishlaydi:
- http://localhost:5000 - Asosiy sahifa
- http://localhost:5000/signup - Ro'yxatdan o'tish
- http://localhost:5000/signin - Kirish
- http://localhost:5000/dashboard - Dashboard (login kerak)

## 🔧 Systemd Service (Production)

```bash
# Telegram Bot service
sudo cp /home/ubuntu/proj/education/telegram-bot.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl start telegram-bot
sudo systemctl enable telegram-bot
sudo systemctl status telegram-bot
```

## 📊 Foydali Buyruqlar

```bash
# Docker log'larni ko'rish
docker-compose logs -f frontend
docker-compose logs -f backend
docker-compose logs -f telegram-bot

# Servislarni qayta ishga tushirish
docker-compose restart frontend
docker-compose restart backend
docker-compose restart telegram-bot

# Servislarni to'xtatish
docker-compose stop

# Servislarni o'chirish
docker-compose down
```

## ✅ Tekshirish

1. **Frontend**: http://localhost:5000 ochilishi kerak
2. **Backend**: http://localhost:8000/docs - API dokumentatsiya
3. **Telegram Bot**: Telegram'da `/start` buyrug'ini yuboring
