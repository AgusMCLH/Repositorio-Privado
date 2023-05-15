import express from 'express';
import handlebars from 'express-handlebars';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.engine('handlebars', handlebars.engine());

app.set('views', './views');
app.set('view engine', 'handlebars');
app.use(express.static('./public'));

const user = { userName: 'Agustin', userRole: 'admin' };

const ArryDeFood = [
  { name: 'Pizza', price: 100 },
  { name: 'Hamburguesa', price: 300 },
  { name: 'Asado', price: 5000000 },
  { name: 'Milanesa', price: 200 },
  { name: 'Tofu', price: 5 },
];

let users = [];

app.get('/a', (req, res) => {
  res.render('index', {
    isAdmin: user.userRole === 'admin',
    ArryDeFood,
    userName: user.userName,
  });
});
app.get('/api/users', (req, res) => {
  res.render('register');
});
app.post('/api/users', (req, res) => {
  console.log(req.body);
  users.push(req.body);
  res.status(201).send(`<p>${JSON.stringify(users)}</p>`);
});

app.listen(8081, () => {
  console.log('Server started on port 8080');
});
