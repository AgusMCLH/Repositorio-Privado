const fs = require('fs');

const leerPackage = async () => {
  try {
    const contenidoStr = await fs.promises.readFile('./package.json', 'utf-8');
    const objeto = {
      contenidoStr: JSON.stringify(contenidoStr),
      contenidoObj: JSON.parse(contenidoStr),
      size: contenidoStr.length,
    };

    await fs.promises.writeFile('./files/info.json', JSON.stringify(objeto));

    console.log(objeto);
  } catch (error) {
    throw new Error('Hubo un error');
  }
};
leerPackage();
