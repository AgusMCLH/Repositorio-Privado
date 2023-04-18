const fs = require('fs');

if (fs.existsSync('./archivos/fsSync.txt')) {
  let contenido = fs.readFileSync('./archivos/fsSync.txt', 'utf-8');
  console.log(contenido);
  fs.appendFileSync('./archivos/fsSync.txt', '. Agrego otra cosa mas');
  contenido = fs.readFileSync('./archivos/fsSync.txt', 'utf-8');
  console.log(contenido);
} else {
  fs.writeFileSync('./archivos/fsSync.txt', 'Esto es una prueba');
}
if (fs.existsSync('./archivos/fsSync.txt')) {
  let contenido = fs.readFileSync('./archivos/fsSync.txt', 'utf-8');
  console.log(contenido);
  fs.appendFileSync('./archivos/fsSync.txt', '. Agrego otra cosa mas');
  contenido = fs.readFileSync('./archivos/fsSync.txt', 'utf-8');
  console.log(contenido);
} else {
  fs.writeFileSync('./archivos/fsSync.txt', 'Esto es una prueba');
}
fs.unlinkSync('./archivos/fsSync.txt');

for (let i = 0; i < 20; i++) {
  fs.writeFileSync(`./archivos/fsSync${i}.txt`, 'Esto es una prueba');
}
