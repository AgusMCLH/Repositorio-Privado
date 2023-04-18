const fs = require('fs');

let fecha = new Date();
fs.writeFile('./files/Doc.txt', ` ${fecha}`, (err) => {
  if (err) console.log('hubo un error');
  fs.readFile('./files/Doc.txt', 'utf-8', (err, contenido) => {
    if (err) console.log('hubo un error');
    console.log(contenido);
  });
});
