import axios from 'axios';
import logger from '../utils/logger.js';
import { API_URL } from '../config/constants.js';

export const coursesCommand = async (bot, msg) => {
  const chatId = msg.chat.id;

  try {
    const response = await axios.get(`${API_URL}/courses`);
    const courses = response.data;

    if (courses.length === 0) {
      await bot.sendMessage(chatId, 'Hozircha kurslar mavjud emas.');
      return;
    }

    let message = '📚 Mavjud kurslar:\n\n';
    courses.forEach((course, index) => {
      message += `${index + 1}. ${course.title}\n`;
      message += `   💰 Narxi: ${course.price} so'm\n\n`;
    });

    await bot.sendMessage(chatId, message);
    logger.info(`Courses command executed for user ${chatId}`);
  } catch (error) {
    logger.error(`Error in courses command: ${error.message}`);
    await bot.sendMessage(chatId, 'Kurslarni yuklashda xatolik yuz berdi.');
  }
};

