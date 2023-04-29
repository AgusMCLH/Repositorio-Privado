const http = require('http');

const server = http.createServer((req, res) => {
  //   console.log(req);
  res.end('Hola mundo');
});

server.listen(8080, () => {
  console.log('Servidor escuchando en el puerto 8080');
});
