import express from 'express';
import { petsRouter } from './router/pets.router.js';
import { usersRouter } from './router/users.router.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/api/users', usersRouter);
app.use('/api/pets', petsRouter);

app.listen(8080, () => {
  console.log('Api started');
});
