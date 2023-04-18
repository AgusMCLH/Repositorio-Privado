const fs = require('fs');

fs.writeFile(
  './archivos/fsSync.txt',
  'Esto es una prueba con callback\n',
  (err) => {
    if (err) return console.log('Hubo un error creando el archivo');
    fs.readFile('./archivos/fsSync.txt', 'utf-8', (err, contenido) => {
      if (err) return console.log('Hubo un error abriendo el archivo');
      console.log(contenido);

      fs.appendFile(
        './archivos/fsSync.txt',
        '. Agrego otra cosa mas',
        (err) => {
          if (err) return console.log('Hubo un error concatenando el archivo');

          fs.readFile('./archivos/fsSync.txt', 'utf-8', (err, contenido) => {
            if (err)
              return console.log('Hubo un error abriendo el segundo archivo');
            console.log(contenido);

            fs.unlink('./archivos/fsSync.txt', (err) => {
              if (err) console.log(`No se pudo borrar`);
            });
          });
        }
      );
    });
  }
);
