import CustomRouter from './customRouter/customRouter.js';
import SessionsDTO from '../DTOs/sessions.DTO.js';

export default class SessionRouter extends CustomRouter {
  init() {
    this.get('/current', ['PUBLIC'], [], async (req, res) => {
      const { user } = req.session;
      if (!user) {
        res.send('No hay usuario logueado');
        return;
      }
      const userToSend = new SessionsDTO(user);
      res.send(userToSend);
    });
  }
}
