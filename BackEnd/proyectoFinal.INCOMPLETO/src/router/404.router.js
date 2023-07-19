import { Router } from 'express';

const notFoundPage = Router();

notFoundPage.get('/', (req, res) => {
  const user = req.session.user;
  res.render('404page', { title: '404', user });
});

export { notFoundPage };
