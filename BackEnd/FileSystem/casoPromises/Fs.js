const fs = require('fs');

const opFs = async () => {
  try {
    await fs.promises.writeFile('./files/Fs.txt', `Hoy es: ${new Date()}`);
    let contenido = await fs.promises.readFile('./files/Fs.txt', 'utf-8');
    console.log(contenido);
    // await fs.promises.unlink('./files/Fs.txt');
  } catch (err) {
    console.log('algo malio sal');
  }
};

opFs();
