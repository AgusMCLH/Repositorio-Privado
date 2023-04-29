const fs = require('fs');

class ProductManager {
  //Declaración de variables para obtención automática del id por producto ingresado
  #prodID = 0;
  #getId() {
    this.#prodID++;
    return this.#prodID;
  }

  //Método constructor del array principal del ProductManager
  constructor() {
    this.path = './files/products.json';
    fs.promises.writeFile(this.path, JSON.stringify([]));
  }

  //Función asíncrona para agregar el producto y guardarlo en archivo
  async addProduct(title, description, price, thumbnail, code, stock) {
    try {
      let product = {
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
        id: this.#getId(),
      };
      if (!title || !description || !price || !thumbnail || !code || !stock) {
        console.log('Error: Todos los campos deben ser completados');
      } else {
        let foundCode = false;
        let productList = JSON.parse(
          await fs.promises.readFile(this.path, 'utf-8')
        );
        console.log('llega');
        console.log(productList);
        productList.forEach((prod) => {
          if (prod.code === code) {
            foundCode = true;
          }
        });
        if (!foundCode) {
          productList.push(product);
          await fs.promises.writeFile(this.path, JSON.stringify(productList));
          return;
        } else {
          console.log('Error: El código de producto ya existe');
        }
      }
    } catch (err) {
      console.log(`Error al agregar el producto: ${err}`);
    }
  }
}

const Productos = new ProductManager();
const testing = async () => {
  await Productos.addProduct(
    'Producto 1',
    'Descripción 1',
    100,
    'https://www.google.com',
    1,
    10
  );
};
testing();
