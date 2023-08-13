import CustomRouter from './customRouter/customRouter.js';

export default class LoggerRouter extends CustomRouter {
  init() {
    this.get('/', ['PUBLIC'], [], async (req, res) => {
      req.logger.debug('LOGGER DEBUG');
      req.logger.html('LOGGER HTML');
      req.logger.info('LOGGER INFO');
      req.logger.warning('LOGGER WARNING');
      req.logger.error('LOGGER ERROR');
      req.logger.fatal('LOGGER FATAL');
      res.send('LoggerRouter');
    });
  }
}
