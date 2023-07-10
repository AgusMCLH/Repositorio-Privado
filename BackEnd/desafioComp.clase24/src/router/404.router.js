import { Router } from 'express';

const notFoundPage = Router();

notFoundPage.get('/', (req, res) => {
  res.render('404page', { title: '404' });
});

export { notFoundPage };
