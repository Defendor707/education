# 🚀 Ishga Tushirish Qo'llanmasi

## Telegram Bot Token
```
7552111773:AAGxv82bROMss57jnzd5NOoCqwIwqjZl4ac
```

## Tez Ishga Tushirish

### 1️⃣ Docker Compose (Eng Oson)

```bash
cd /home/ubuntu/proj/education

# Barcha servislarni ishga tushirish (Database, Backend, Frontend, Telegram Bot)
docker-compose up -d

# Status tekshirish
docker-compose ps

# Log'larni ko'rish
docker-compose logs -f telegram-bot
```

### 2️⃣ Telegram Botni Alohida Ishga Tushirish

```bash
cd /home/ubuntu/proj/education/telegram-bot

# Dependencies o'rnatish (birinchi marta)
npm install

# Botni ishga tushirish
npm start

# Yoki development mode (auto-reload)
npm run dev
```

### 3️⃣ Systemd Service (Production)

```bash
# Service faylini ko'chirish
sudo cp /home/ubuntu/proj/education/telegram-bot.service /etc/systemd/system/

# Service'ni qayta yuklash
sudo systemctl daemon-reload

# Service'ni ishga tushirish
sudo systemctl start telegram-bot

# Avtomatik ishga tushirish
sudo systemctl enable telegram-bot

# Status
sudo systemctl status telegram-bot
```

## Kerakli Shartlar

### Backend API ishlamoqda bo'lishi kerak

```bash
# Backend'ni ishga tushirish
cd /home/ubuntu/proj/education/backend

# Virtual environment yaratish
python3 -m venv venv
source venv/bin/activate

# Dependencies o'rnatish
pip install -r requirements.txt

# Database yaratish (agar kerak bo'lsa)
# PostgreSQL ishlamoqda bo'lishi kerak

# Backend'ni ishga tushirish
python run.py
```

Backend `http://localhost:8000` da ishlashi kerak.

## Botni Tekshirish

1. Telegram'da botni toping
2. `/start` buyrug'ini yuboring
3. Bot javob berishi kerak

## Bot Buyruqlari

- `/start` - Botni ishga tushirish
- `/signup username email password first_name last_name` - Ro'yxatdan o'tish
- `/signin username password` - Kirish
- `/courses` - Kurslar ro'yxati

## Xatoliklar

### Bot ishlamayapti
```bash
# Log'larni ko'rish
cd /home/ubuntu/proj/education/telegram-bot
cat logs/combined.log
cat logs/error.log
```

### Backend ulanmayapti
- Backend ishlayotganini tekshiring: `curl http://localhost:8000/health`
- API_URL to'g'riligini tekshiring

### Token xatosi
- Token to'g'riligini tekshiring
- .env faylda TELEGRAM_BOT_TOKEN mavjudligini tekshiring

## Production Deployment

1. Systemd service yaratish (yuqorida)
2. Log rotation sozlash
3. Monitoring qo'shish
4. Auto-restart sozlash

## Foydali Buyruqlar

```bash
# Docker orqali botni ko'rish
docker-compose logs -f telegram-bot

# Botni qayta ishga tushirish
docker-compose restart telegram-bot

# Botni to'xtatish
docker-compose stop telegram-bot

# Botni o'chirish
docker-compose down telegram-bot
```

