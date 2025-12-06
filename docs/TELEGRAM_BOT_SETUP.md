# Telegram Bot Setup Guide

## Telegram Bot Token

Bot token: `7552111773:AAGxv82bROMss57jnzd5NOoCqwIwqjZl4ac`

## Ishga Tushirish Usullari

### 1. Docker Compose orqali (Tavsiya etiladi)

```bash
cd /home/ubuntu/proj/education

# .env faylga token qo'shish (allaqachon qo'shilgan)
# TELEGRAM_BOT_TOKEN=7552111773:AAGxv82bROMss57jnzd5NOoCqwIwqjZl4ac

# Barcha servislarni ishga tushirish
docker-compose up -d

# Faqat telegram bot
docker-compose up telegram-bot
```

### 2. Manual ishga tushirish

```bash
cd /home/ubuntu/proj/education/telegram-bot

# Dependencies o'rnatish
npm install

# .env fayl yaratish (agar yo'q bo'lsa)
cp .env.example .env
# .env faylga token qo'shing

# Botni ishga tushirish
npm start

# Yoki development mode
npm run dev
```

### 3. Systemd Service orqali (Production)

```bash
# Service faylini ko'chirish
sudo cp /home/ubuntu/proj/education/telegram-bot.service /etc/systemd/system/

# Service'ni qayta yuklash
sudo systemctl daemon-reload

# Service'ni ishga tushirish
sudo systemctl start telegram-bot

# Service'ni avtomatik ishga tushirish
sudo systemctl enable telegram-bot

# Status tekshirish
sudo systemctl status telegram-bot

# Log'larni ko'rish
sudo journalctl -u telegram-bot -f
```

### 4. Skript orqali

```bash
./scripts/start-telegram-bot.sh
```

## Kerakli Shartlar

1. **Backend API ishlamoqda bo'lishi kerak**
   ```bash
   # Backend'ni ishga tushirish
   cd backend
   python run.py
   # Yoki
   docker-compose up backend
   ```

2. **Environment Variables**
   - `TELEGRAM_BOT_TOKEN` - Bot token (berilgan)
   - `API_URL` - Backend API URL (default: http://localhost:8000/api)

## Bot Buyruqlari

- `/start` - Botni ishga tushirish
- `/signup username email password first_name last_name` - Ro'yxatdan o'tish
- `/signin username password` - Kirish
- `/courses` - Kurslar ro'yxati

## Tekshirish

1. Telegram'da botni toping: `@your_bot_username`
2. `/start` buyrug'ini yuboring
3. Bot javob berishi kerak

## Xatoliklar

### Bot ishlamayapti
- Token to'g'riligini tekshiring
- Backend API ishlayotganini tekshiring
- Log'larni ko'ring: `logs/combined.log`

### Connection error
- Backend API URL'ni tekshiring
- Network connectivity'ni tekshiring
- Docker network'ni tekshiring (agar Docker ishlatilsa)

## Production Deployment

1. Systemd service yaratish (yuqorida ko'rsatilgan)
2. Log rotation sozlash
3. Monitoring qo'shish
4. Auto-restart sozlash

## Logs

Log fayllar `telegram-bot/logs/` papkasida:
- `error.log` - Xatolar
- `combined.log` - Barcha log'lar

