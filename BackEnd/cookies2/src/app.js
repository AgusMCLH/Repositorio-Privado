import express from 'express';
import handlebars from 'express-handlebars';
import userRouter from './router/user.router.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.engine('handlebars', handlebars.engine());

app.set('views', './views');
app.set('view engine', 'handlebars');
app.use(express.static('./public'));

app.use('/', userRouter);

app.listen(8081, () => {
  console.log('Example app listening on port 3000!');
});
