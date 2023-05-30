import express from 'express';
import handlebars from 'express-handlebars';
import mongoose from 'mongoose';
import studentRouter from './routers/student.router.js';
import viewsRouter from './routers/views.router.js';
import courseRouter from './routers/course.router.js';

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.engine('handlebars', handlebars.engine());

app.set('views', './views');
app.set('view engine', 'handlebars');
app.use(express.static('./public'));

app.use('/api/courses', courseRouter);
app.use('/api/students', studentRouter);
app.use('/', viewsRouter);

mongoose.connect(
  'mongodb+srv://agustindiaz980:Fecha1990@cluster0.otb4efz.mongodb.net/?retryWrites=true&w=majority'
);

app.use('/api/students', studentRouter);

app.listen(8080, () => {
  console.log('Server started on port 8080');
});
