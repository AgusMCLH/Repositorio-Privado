import express from 'express';

const app = express();

app.get('/bienvenida', (req, res) => {
  console.log(req);
  res.send('<p style="color:blue;">Te doy la bienvenida</p>');
});

app.get('/usuario', (req, res) => {
  console.log(req);
  const user = {
    nombre: 'Juan',
    apellido: 'Perez',
    edad: 25,
    correo: 'correo',
  };
  console.log('a', user);
  res.send(`<p style="color:green;">${user}</p>`);
});

app.listen(8080, () => {
  console.log('Servidor escuchando en el puerto 8080');
});
