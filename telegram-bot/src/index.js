import TelegramBot from 'node-telegram-bot-api';
import dotenv from 'dotenv';
import { startCommand } from './commands/start.js';
import { coursesCommand } from './commands/courses.js';
import { signupCommand, handleSignup } from './commands/signup.js';
import { signinCommand, handleSignin } from './commands/signin.js';
import { errorHandler } from './middleware/errorHandler.js';
import logger from './utils/logger.js';

dotenv.config();

const token = process.env.TELEGRAM_BOT_TOKEN;

if (!token) {
  logger.error('TELEGRAM_BOT_TOKEN is not set');
  process.exit(1);
}

const bot = new TelegramBot(token, { polling: true });

// Error handling middleware
bot.on('polling_error', errorHandler);

// Commands
bot.onText(/\/start/, (msg) => startCommand(bot, msg));
bot.onText(/\/signup(?:\s+(.+))?/, (msg, match) => {
  if (match && match[1]) {
    const args = match[1].split(' ');
    handleSignup(bot, msg, args);
  } else {
    signupCommand(bot, msg);
  }
});
bot.onText(/\/signin(?:\s+(.+))?/, (msg, match) => {
  if (match && match[1]) {
    const args = match[1].split(' ');
    handleSignin(bot, msg, args);
  } else {
    signinCommand(bot, msg);
  }
});
bot.onText(/\/courses/, (msg) => coursesCommand(bot, msg));

// Message handler
bot.on('message', (msg) => {
  logger.info(`Message from ${msg.chat.id}: ${msg.text}`);
});

logger.info('Telegram bot started successfully');

export default bot;

