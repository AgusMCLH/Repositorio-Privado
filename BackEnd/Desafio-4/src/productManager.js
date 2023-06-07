import fs from 'fs';
import { io } from './app.js';

class Producto {
  //Declaro el constructor y el ID de la clase de forma privada
  #id = 0;
  constructor() {
    this.productos = [];
    this.path = './src/productos.json';
  }

  //Funcion de agregar producto, recibe los campos, los valida. y si esta bien los agrega al array de productos, sino lanza un mensaje de error
  async addProducts({ title, description, price, thumbnail, code, stock }) {
    this.productos = await this.getProducts();
    try {
      if (
        title === undefined ||
        typeof title !== 'string' ||
        description === undefined ||
        typeof title !== 'string' ||
        price === undefined ||
        typeof price !== 'number' ||
        code === undefined ||
        typeof code !== 'string' ||
        stock === undefined ||
        typeof stock !== 'number'
      ) {
        //Si alguno de los campos esta vacio el sistema se lo hace saber al usuario
        return {
          code: 400,
          msg: `El producto no fue ingresado - Algun campo esta vacio`,
        };
      }
      if (thumbnail === undefined) {
        thumbnail = ['Sin foto'];
      } else {
        if (typeof thumbnail !== 'object' || thumbnail.length === 0) {
          return {
            code: 400,
            msg: `El producto con el codigo "${code}" no fue agregado - Algun campo esta vacio o en un formato incorrecto`,
          };
        }
      }
      if (thumbnail === undefined) {
        thumbnail = ['Sin foto'];
      }
      //Utiliza la funcion privada de Existe codigo para verificar que no exista el producto en el array
      if (this.#ExisteCodigo(code)) {
        console.warn(`El producto con el codigo "${code}" ya fue ingresado`);
        return {
          code: 400,
          msg: `El producto con el codigo "${code}" ya fue ingresado`,
        };
      }
      //Crea el producto a ser pusheado
      const producto = {
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
        status: true,
      };
      //Agrega el atributo id al producto a travez de una funcion que le devuelve el ID a utilizar
      producto.id = await this.#getID();
      //Agrega el objeto producto al array
      this.productos.push(producto);
      //Le avisa al usuario que se agrego correctamente
      console.info(
        `El producto de codigo: ${producto.code} fue agregado con el id: ${producto.id}`
      );
      await fs.promises.writeFile(this.path, JSON.stringify(this.productos));
      io.emit('Products', await this.getProducts());
      return {
        code: 201,
        msg: `el producto fue agregado correctamente`,
      };
    } catch (error) {
      console.log('Error al agregar producto', error);
      return { code: 500, msg: `Error al agregar producto: ${error}` };
    }
  }

  //Retorna todos los productos
  async getProducts() {
    try {
      let productosJSON = JSON.parse(
        await fs.promises.readFile(this.path, 'utf-8')
      );
      return productosJSON;
    } catch (error) {
      console.log('Error al obtener productos', error);
    }
  }

  //Recibe un ID y lo busca si el index es -1 (Es decir que no existe) entonces envia un mensaje de error
  async getProductByID(id) {
    try {
      let productosJSON = JSON.parse(
        await fs.promises.readFile(this.path, 'utf-8')
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

  //Devuelve el contenido de ID y luego suma 1
  async #getID() {
    this.#id = (await this.getProducts()).length;
    const auxiliarID = this.#id;
    this.#id++;
    return auxiliarID;
  }

  //Actualiza el producto, recibe el ID, y los campos a actualizar
  async updateProduct({
    idAEditar,
    title,
    description,
    price,
    thumbnail,
    code,
    status,
    stock,
  }) {
    if (
      status === undefined ||
      typeof status !== 'boolean' ||
      title === undefined ||
      typeof title !== 'string' ||
      description === undefined ||
      typeof description !== 'string' ||
      price === undefined ||
      typeof price !== 'number' ||
      code === undefined ||
      typeof code !== 'string' ||
      stock === undefined ||
      typeof stock !== 'number'
    ) {
      //Si alguno de los campos esta vacio el sistema se lo hace saber al usuario
      return {
        code: 400,
        msg: `El producto con el id "${idAEditar}" no fue actualizado - Algun campo esta vacio o en un formato incorrecto`,
      };
    }
    try {
      if (thumbnail === undefined) {
        thumbnail = ['Sin foto'];
      } else {
        if (typeof thumbnail !== 'object' || thumbnail.length === 0) {
          return {
            code: 400,
            msg: `El producto con el id "${idAEditar}" no fue actualizado - Algun campo esta vacio o en un formato incorrecto`,
          };
        }
      }
      console.error(typeof thumbnail);
      this.productos = await this.getProducts();
      //Busca el producto por ID
      let index = this.productos.findIndex((product) => {
        return product.id === idAEditar;
      });
      //Si el index es -1 es porque no existe el producto
      if (index === -1) {
        console.error(`No existe ningun producto con el id ${idAEditar}`);
        return {
          code: 404,
          msg: `No existe ningun producto con el id ${idAEditar}`,
        };
      }
      //Si el codigo es distinto al codigo del producto que se quiere actualizar y el codigo ya existe entonces envia un mensaje de error
      if (code !== this.productos[index].code) {
        if (this.#ExisteCodigo(code)) {
          console.warn(`El producto con el codigo "${code}" ya fue ingresado`);
          return {
            code: 400,
            msg: `El producto con el codigo "${code}" ya fue ingresado`,
          };
        }
      }
      //Actualiza los campos del producto
      this.productos[index] = {
        id: idAEditar,
        title,
        description,
        price,
        thumbnail,
        code,
        status,
        stock,
      };
      //Le avisa al usuario que se actualizo correctamente
      await fs.promises.writeFile(this.path, JSON.stringify(this.productos));
      console.info(
        `El producto con el id ${idAEditar} fue actualizado correctamente a: `,
        this.productos[index]
      );
      io.emit('Products', await this.getProducts());
      return {
        code: 200,
        msg: `El producto con el id ${idAEditar} fue actualizado correctamente a: \n${JSON.stringify(
          this.productos[index]
        )}`,
      };
    } catch (error) {
      console.log('Error al actualizar producto', error);
    }
  }

  //Elimina un producto por ID
  async deleteProduct(id) {
    try {
      let productosJSON = JSON.parse(
        await fs.promises.readFile(this.path, 'utf-8')
      );
      //Busca el producto por ID
      let index = productosJSON.findIndex((product) => {
        return product.id === id;
      });
      //Si el index es -1 es porque no existe el producto
      if (index === -1) {
        console.error(`No existe ningun producto con el id ${id}`);
        return { code: 404, msg: `No existe ningun producto con el id ${id}` };
      }
      //Elimina el producto del array
      productosJSON.splice(index, 1);
      //Le avisa al usuario que se elimino correctamente
      console.info(`El producto con el id ${id} fue eliminado correctamente`);
      await fs.promises.writeFile(this.path, JSON.stringify(productosJSON));
      io.emit('Products', await this.getProducts());
      return {
        code: 200,
        msg: `El producto con el id ${id} fue elminado correctamente.`,
      };
    } catch (error) {
      console.log('Error al eliminar producto', error);
    }
  }

  //Comprueba que exista un producto con un codigo que se le pase como prop
  #ExisteCodigo(codigo) {
    //Busca el producto por codigo
    let index = this.productos.findIndex((product) => {
      return product.code === codigo;
    });
    //Si el index no es -1 devuelev false, sino devuelve true
    return index !== -1 ? true : false;
  }
}

const productManager = new Producto();

const test = async () => {
  console.log('productos', await productManager.getProducts());
  // await productManager.addProducts({
  //   title: 'titulo 12',
  //   description: 'desc12',
  //   price: 400,
  //   thumbnail: ['Sin foto'],
  //   code: 'ASD1234',
  //   stock: 10,
  // });
  // console.log(await productManager.updateProduct(20, 'titulo 1', 'desc1', 400, 'Sin foto', 'ASD123', true, 10));
};
test();

export default productManager;
