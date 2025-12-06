import logger from '../utils/logger.js';

export const errorHandler = (error) => {
  logger.error(`Polling error: ${error.message}`);
  logger.error(error.stack);
};

