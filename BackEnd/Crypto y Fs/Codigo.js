const fs = require('fs');

const crearUsuario = async (user, Pass) => {
  try {
    // console.log('llega', user, Pass);
    const usuarios = JSON.parse(
      await fs.promises.readFile('./files/usuarios.json', 'utf-8')
    );
    const { createHash } = await import('node:crypto');
    const usuario = {
      user: user,
      pass: await createHash('shake256').update(Pass, 'utf-8').digest('hex'),
    };
    console.log(await usuario);
    usuarios.push(await usuario);
    console.log(await usuarios);
    await escribirArchivo('./files/usuarios.json', JSON.stringify(usuarios));
  } catch (err) {
    console.log('algo malio sal', 'crearUsuario');
  }
};

escribirArchivo = async (nombreArchivo, contenidoArchivo) => {
  try {
    await fs.promises.writeFile(nombreArchivo, `${contenidoArchivo}\n`);
  } catch (err) {
    console.log('algo malio sal', 'escribirArchivo');
  }
};

const testing = async () => {
  await crearUsuario('Agus', 'Agus1234');
  await crearUsuario('mariykydjda', 'sjsjdtjsrtrjrstjsrtj');
  await crearUsuario('juan', 'juan1234');
  await crearUsuario('pedro', 'pedro1234');
};
testing();
