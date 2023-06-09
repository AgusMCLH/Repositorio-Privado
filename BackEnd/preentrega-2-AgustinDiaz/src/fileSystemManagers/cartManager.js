import fs from 'fs';

class Cart {
  #id = 0;
  constructor() {
    this.carts = [];
    this.path = './src/carts.json';
  }

  //Retorna todos los carritos
  async #getCarts() {
    try {
      let cartsJSON = JSON.parse(
        await fs.promises.readFile(this.path, 'utf-8')
      );
      return cartsJSON;
    } catch (error) {
      console.log('Error al obtener los carritos', error);
    }
  }

  //Recibe un ID y lo busca si el index es -1 (Es decir que no existe) entonces envia un mensaje de error
  async getCartByID(id) {
    try {
      //Cargo todos los carritos
      let cartsJSON = JSON.parse(
        await fs.promises.readFile(this.path, 'utf-8')
      );
      //Busco el carrito que me sirve
      let index = cartsJSON.findIndex((cart) => {
        return cart.id === id;
      });
      //Si el index es -1 es porque no existe el producto
      if (index === -1) {
        //Retorna el mensaje de error
        return false;
      }
      //Retorna el carrito
      return cartsJSON[index];
    } catch (error) {
      console.log('Error al obtener carrito por ID', error);
    }
  }

  //Devuelve el contenido de ID sumando 1
  async #getID() {
    this.#id = (await this.#getCarts()).length;
    const auxiliarID = this.#id;
    this.#id++;
    return auxiliarID;
  }

  async addCart() {
    this.carts = await this.#getCarts();
    try {
      //Crea el carrito a ser pusheado
      const cart = {
        //Agrega el atributo id al carrito a traves de una funcion que le devuelve el ID a utilizar
        id: await this.#getID(),
        products: [],
      };

      //Agrega el objeto cart al array
      this.carts.push(cart);
      //Escribe el archivo
      await fs.promises.writeFile(this.path, JSON.stringify(this.carts));
      //Le avisa al usuario que se agrego correctamente
      return {
        code: 201,
        msg: `El cart fue agregado con el id: ${cart.id}`,
      };
    } catch (error) {
      console.log('Error al agregar cart', error);
      return { code: 500, msg: `Error al agregar cart: ${error}` };
    }
  }

  //Recibe un ID y lo busca si el index es -1 (Es decir que no existe) entonces envia un mensaje de error
  async #getProductByID(id) {
    try {
      let productosJSON = JSON.parse(
        await fs.promises.readFile('./src/productos.json', 'utf-8')
      );
      let index = productosJSON.findIndex((product) => {
        return product.id === id;
      });
      //Si el index es -1 es porque no existe el producto
      if (index === -1) {
        return `No existe ningun producto con el id ${id}`;
      } else {
        return productosJSON[index];
      }
    } catch (error) {
      console.log('Error al obtener producto por ID', error);
    }
  }

  async addProductToCart(id, product) {
    try {
      //Valida que los datos ingresados sean correctos
      if (id === undefined || product === undefined) {
        return {
          code: 400,
          msg: `Error al agregar producto al carrito: faltan datos`,
        };
      }

      //Valida que el carrito exista
      if (
        (await this.getCartByID(id)) ===
        `No existe ningun carrito con el id ${id}`
      ) {
        return { code: 400, msg: `No existe ningun carrito con el id ${id}` };
      }

      //Cargo el producto
      let producto = await this.#getProductByID(product);
      //Si el producto no existe da error
      if (producto === `No existe ningun producto con el id ${product}`) {
        return {
          code: 400,
          msg: `No existe ningun producto con el id ${product}`,
        };
      }

      //Cargo todos los carritos
      let cartsJSON = JSON.parse(
        await fs.promises.readFile(this.path, 'utf-8')
      );

      //Busco el carrito que me sirve
      let index = cartsJSON.findIndex((cart) => {
        return cart.id === id;
      });

      //Busco el id que me pasaron en el carrito
      const indexEnCarrito = cartsJSON[index].products.findIndex((prod) => {
        return prod.id === product;
      });

      //Si el producto no existe en el carrito lo agrega, sino le suma 1 a la cantidad
      if (indexEnCarrito === -1) {
        cartsJSON[index].products.push({ id: product, quantity: 1 });
      } else if (indexEnCarrito !== -1) {
        cartsJSON[index].products[indexEnCarrito].quantity++;
      }

      //Escribe el archivo
      await fs.promises.writeFile(this.path, JSON.stringify(cartsJSON));
      //Devuelve el mensaje de exito
      return {
        code: 201,
        msg: `El producto con el id ${product} fue agregado al carrito con el id: ${index}`,
      };
    } catch (error) {
      console.log('Error al agregar producto al carrito', error);
      return {
        code: 500,
        msg: `Error al agregar producto al carrito: ${error}`,
      };
    }
  }
}

const CM = new Cart();
// const test = async () => {
//   //   console.log(await CM.addCart());
//   //   console.log(await CM.getProductByID(203));
//   //   console.log(await CM.getCartByID(1));
//   console.log(await CM.addProductToCart(5, 10));
// };
// test();
export default CM;
