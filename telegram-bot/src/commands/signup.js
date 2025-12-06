import axios from 'axios';
import logger from '../utils/logger.js';
import { API_URL } from '../config/constants.js';

export const signupCommand = async (bot, msg) => {
  const chatId = msg.chat.id;
  
  try {
    await bot.sendMessage(chatId, 
      `📝 Ro'yxatdan o'tish uchun quyidagi ma'lumotlarni yuboring:\n\n` +
      `Format: /signup username email password first_name last_name\n\n` +
      `Misol: /signup john john@example.com password123 John Doe`
    );
  } catch (error) {
    logger.error(`Error in signup command: ${error.message}`);
  }
};

export const handleSignup = async (bot, msg, args) => {
  const chatId = msg.chat.id;
  
  if (args.length < 5) {
    await bot.sendMessage(chatId, 
      '❌ Noto\'g\'ri format. Quyidagicha yuboring:\n' +
      '/signup username email password first_name last_name'
    );
    return;
  }
  
  const [username, email, password, firstName, ...lastNameParts] = args;
  const lastName = lastNameParts.join(' ');
  
  try {
    const response = await axios.post(`${API_URL}/auth/signup`, {
      username,
      email,
      password,
      first_name: firstName,
      last_name: lastName,
    });
    
    await bot.sendMessage(chatId, 
      `✅ Muvaffaqiyatli ro'yxatdan o'tdingiz!\n\n` +
      `👤 Foydalanuvchi: ${response.data.username}\n` +
      `📧 Email: ${response.data.email}\n\n` +
      `Endi /signin buyrug'i bilan kirishingiz mumkin.`
    );
    
    logger.info(`User ${username} signed up via Telegram`);
  } catch (error) {
    const errorMsg = error.response?.data?.detail || 'Xatolik yuz berdi';
    await bot.sendMessage(chatId, `❌ ${errorMsg}`);
    logger.error(`Error in signup: ${error.message}`);
  }
};

