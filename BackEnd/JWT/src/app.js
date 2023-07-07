import express from 'express';
import {
  generateToken,
  authenticateToken,
} from './middleware/jwt.middleware.js';

const app = express();

app.use(express.json());

let users = [];

app.post('/register', (req, res) => {
  console.log(req.body);
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username);
  if (user) {
    res.status(401).send({ message: 'El usuario ya existe' });
  } else {
    users.push({ username, password });
    res.status(201).send({ message: 'Usuario creado' });
  }
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  console.log(username, password, users);
  const user = users.find(
    (u) => u.username === username && u.password === password
  );
  if (user) {
    const token = generateToken(user);
    res.status(200).send({ message: `${user.username} Token ${token}` });
  } else {
    res.status(401).send({ message: 'Usuario o contraseña incorrectos' });
  }
});

app.get('/private', authenticateToken, (req, res) => {
  console.log('nw');
  console.log(req);
  res.status(200).send({
    message: `Acceso permitido a ${req.user} con el token ${req.headers.authorization}`,
  });
});

app.listen(8080, () => {
  console.log('Server started on port 8080');
});
