const fs = require('fs');
const crypto = require('crypto');
const { test } = require('node:test');

const crearUsuario = async (user, Pass) => {
  try {
    console.log('llega', user, Pass);
    const usuarios = JSON.parse(
      await fs.promises.readFile('./files/usuarios.json', 'utf-8')
    );
    const usuario = {
      user: user,
      pass: await crypto.createHash('shake256', Pass).digest('hex'),
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

// const Hash = async (pass) => {
// const hash = await crypto.createHash();
//   console.log(await hash);
//   return await hash;
// };

// Hash('Agus1234');
