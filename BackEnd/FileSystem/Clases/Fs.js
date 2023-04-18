const fs = require('fs');

class UserManager {
  constructor() {
    fs.promises.writeFile('./users.json', JSON.stringify([]));
  }

  async addUser(user) {
    try {
      const actualUsers = await this.getUsers();
      actualUsers.push(user);
      await fs.promises.writeFile('./users.json', JSON.stringify(actualUsers));
    } catch (error) {
      console.log('No se pudo agregar al usuarios');
    }
  }

  async getUsers() {
    try {
      const actualUsers = await fs.promises.readFile('./users.json', 'utf-8');
      return JSON.parse(actualUsers);
    } catch (error) {
      console.log('No se pudo conseguir los usuarios');
    }
  }
}

const users = new UserManager();

const test = async () => {
  try {
    setTimeout(async () => {
      await users.addUser({
        nombre: 'Agus',
        apellido: 'Diaz',
        edad: 18,
        genero: 'M',
        curso: 'Coder 43330',
      });
      await users.addUser({
        nombre: 'Martin',
        apellido: 'Perez',
        edad: 28,
        genero: 'M',
        curso: 'Coder 43330',
      });

      console.log(await users.getUsers());
    }, 2000);
  } catch (err) {
    console.log('Malio sal el test');
  }
};

test();
