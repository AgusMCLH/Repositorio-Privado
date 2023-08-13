import CustomRouter from './customRouter/customRouter.js';

export default class HomeRouter extends CustomRouter {
  init() {
    this.get('/', ['PUBLIC'], [], async (req, res) => {
      const user = req.session.user;

      res.render('home', { title: 'Home', user });
    });
  }
}
