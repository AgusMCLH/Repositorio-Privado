import CustomRouter from './customRouter/customRouter.js';

export default class ChatRouter extends CustomRouter {
  init() {
    this.get('/', ['USUARIO'], [], async (req, res) => {
      const user = req.session.user;
      res.render('chat', { title: 'Chat', user });
    });
  }
}
