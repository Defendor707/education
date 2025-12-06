import logger from '../utils/logger.js';

export const startCommand = async (bot, msg) => {
  const chatId = msg.chat.id;
  const firstName = msg.from.first_name;

  const welcomeMessage = `
👋 Salom, ${firstName}!

🎓 Education Platform'ga xush kelibsiz!

Quyidagi buyruqlardan foydalaning:
/courses - Kurslar ro'yxati
/help - Yordam
/about - Platforma haqida
  `;

  try {
    await bot.sendMessage(chatId, welcomeMessage);
    logger.info(`Start command executed for user ${chatId}`);
  } catch (error) {
    logger.error(`Error in start command: ${error.message}`);
    await bot.sendMessage(chatId, 'Xatolik yuz berdi. Iltimos, keyinroq urinib ko\'ring.');
  }
};

