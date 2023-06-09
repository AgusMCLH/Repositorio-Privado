import express from 'express';
import cookieParser from 'cookie-parser';
import cookieRouter from './routes/cookies.router.js';

const app = express();

app.use(cookieParser('uyhreabgiluershgliaeuh'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/cookies', cookieRouter);

app.listen(8080, () => {
  console.log('Example app listening on port 3000!');
});
