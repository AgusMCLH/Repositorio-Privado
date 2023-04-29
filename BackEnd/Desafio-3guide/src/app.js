const express = require('express');
const app = express();

app.get('/bienvenida/:a/:gesnrjg', (req, res) => {
  console.log(req.params.a);
  res.send('<p style="color:blue;">Te doy la bienvenida</p>');
});

app.get('', (req, res) => {
  res.send('<p style="color:blue;">Pagina de inicio</p>');
});

app.listen(8080, () => {
  console.log('Servidor escuchando en el puerto 8080');
});
