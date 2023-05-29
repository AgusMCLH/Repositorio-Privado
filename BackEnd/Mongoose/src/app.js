import express from 'express';
import usersRouter from './routers/users.router.js';
import mongoose from 'mongoose';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(8080, () => {
  console.log('Server started on port 8080');
});

app.use('/api/users', usersRouter);

mongoose.connect(
  'mongodb+srv://agustindiaz980:Fecha1990@cluster0.otb4efz.mongodb.net/?retryWrites=true&w=majority'
);
