import EErros from '../utils/tools/EErrors.js';
import { logger } from './logger.middleware.js';

export default (error, req, res, next) => {
  logger.info(error.name);
  switch (error.code) {
    case EErros.INVALID_TYPE:
      logger.warning(error.cause);
      res.status(400).send({ status: 'error', error: error.name });
      break;
    case EErros.AUTHENTICATION_ERROR:
      logger.warning(error.cause);
      res.redirect('/users/signin');
      break;
    case EErros.AUTHORIZATION_ERROR:
      logger.warning(error.cause);
      res.status(403).send({ status: 'error', error: error.cause });
      break;
    default:
      logger.error(error);
      res.status(500).send({ status: 'error', error: 'Internal Server Error' });
      break;
  }
};
