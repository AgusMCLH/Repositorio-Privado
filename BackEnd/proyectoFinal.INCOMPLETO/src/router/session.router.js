import { Router } from 'express';

const sessions = Router();

sessions.get('/current', (req, res) => {
  req.session.user ? res.send(req.session.user) : res.send('Hola Debo 👋(?');
});

export { sessions };
