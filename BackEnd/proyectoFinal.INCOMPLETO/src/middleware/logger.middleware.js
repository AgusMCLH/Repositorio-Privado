import winston from 'winston';
import config from '../config/config.js';

const customLevelsOptions = {
  levels: {
    fatal: 0,
    error: 1,
    warning: 2,
    info: 3,
    html: 4,
    debug: 5,
  },
  colors: {
    fatal: 'red',
    error: 'red',
    warning: 'yellow',
    info: 'green',
    html: 'green',
    debug: 'blue',
  },
};
let logger = winston.createLogger({
  levels: customLevelsOptions.levels,
  transports: [
    new winston.transports.Console({
      level: 'info',
      format: winston.format.combine(
        winston.format.colorize({ colors: customLevelsOptions.colors }),
        winston.format.simple()
      ),
    }),
    new winston.transports.File({
      filename: 'logs/errors.log',
      level: 'error',
    }),
  ],
});

if (config.DevMode) {
  logger = winston.createLogger({
    levels: customLevelsOptions.levels,
    transports: [
      new winston.transports.Console({
        level: 'debug',
        format: winston.format.combine(
          winston.format.colorize({ colors: customLevelsOptions.colors }),
          winston.format.simple()
        ),
      }),
    ],
  });
}

export { logger };
export const loggerMiddleware = (req, res, next) => {
  req.logger = logger;
  if (req.method !== 'GET') {
    logger.html(
      `${req.method} - ${req.url} - [${
        req.ip
      }] -  ${new Date().toLocaleString()}`
    );
  }
  next();
};
