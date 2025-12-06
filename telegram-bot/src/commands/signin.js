import axios from 'axios';
import logger from '../utils/logger.js';
import { API_URL } from '../config/constants.js';

// Store user tokens (in production, use database)
const userTokens = new Map();

export const signinCommand = async (bot, msg) => {
  const chatId = msg.chat.id;
  
  try {
    await bot.sendMessage(chatId, 
      `🔐 Kirish uchun quyidagi formatda yuboring:\n\n` +
      `/signin username password\n\n` +
      `Misol: /signin john password123`
    );
  } catch (error) {
    logger.error(`Error in signin command: ${error.message}`);
  }
};

export const handleSignin = async (bot, msg, args) => {
  const chatId = msg.chat.id;
  
  if (args.length < 2) {
    await bot.sendMessage(chatId, 
      '❌ Noto\'g\'ri format. Quyidagicha yuboring:\n' +
      '/signin username password'
    );
    return;
  }
  
  const [username, password] = args;
  
  try {
    const response = await axios.post(`${API_URL}/auth/signin`, {
      username,
      password,
    });
    
    // Save token for this user
    userTokens.set(chatId, response.data.access_token);
    
    // Get user profile
    const profileResponse = await axios.get(`${API_URL}/auth/me`, {
      headers: {
        Authorization: `Bearer ${response.data.access_token}`,
      },
    });
    
    await bot.sendMessage(chatId, 
      `✅ Muvaffaqiyatli kirdingiz!\n\n` +
      `👤 Xush kelibsiz, ${profileResponse.data.first_name}!\n` +
      `📧 Email: ${profileResponse.data.email}\n` +
      `🎓 Rol: ${profileResponse.data.role}\n\n` +
      `Endi /courses buyrug'i bilan kurslarni ko'rishingiz mumkin.`
    );
    
    logger.info(`User ${username} signed in via Telegram`);
  } catch (error) {
    const errorMsg = error.response?.data?.detail || 'Foydalanuvchi nomi yoki parol noto\'g\'ri';
    await bot.sendMessage(chatId, `❌ ${errorMsg}`);
    logger.error(`Error in signin: ${error.message}`);
  }
};

export const getUserToken = (chatId) => {
  return userTokens.get(chatId);
};

export const logoutUser = (chatId) => {
  userTokens.delete(chatId);
};

