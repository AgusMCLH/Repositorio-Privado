import { logger } from '../../middleware/logger.middleware.js';

export const generateUserErrorInfo = ({ name, lastName, email }) => {
  logger.info(name, lastName, email);
  return `User 
  Name> ${name} 
  lastName> ${lastName}
  email> ${email}`;
};
