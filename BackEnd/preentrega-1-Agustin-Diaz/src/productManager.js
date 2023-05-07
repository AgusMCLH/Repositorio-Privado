import fs from 'fs';

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
        description === undefined ||
        price === undefined ||
        thumbnail === undefined ||
        code === undefined ||
        stock === undefined
      ) {
        //Si alguno de los campos esta vacio el sistema se lo hace saber al usuario
        console.error(
          `El producto con el codigo "${code}" no fue ingresado - Algun campo esta vacio`
        );
        return;
      }
      //Utiliza la funcion privada de Existe codigo para verificar que no exista el producto en el array
      if (this.#ExisteCodigo(code)) {
        console.warn(`El producto con el codigo "${code}" ya fue ingresado`);
        return;
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
      return;
    } catch (error) {
      console.log('Error al agregar producto', error);
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
      if (index !== -1) {
        return productosJSON[index];
      } else if (index === -1) {
        return `No existe ningun producto con el id ${id}`;
      }

      return;
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
    id,
    title,
    description,
    price,
    thumbnail,
    code,
    status,
    stock,
  }) {
    if (
      id === undefined ||
      status === undefined ||
      title === undefined ||
      description === undefined ||
      price === undefined ||
      thumbnail === undefined ||
      code === undefined ||
      stock === undefined
    ) {
      //Si alguno de los campos esta vacio el sistema se lo hace saber al usuario
      console.error(
        `El producto con el codigo "${id}" no fue actualizado - Algun campo esta vacio`
      );
      return;
    }
    try {
      this.productos = await this.getProducts();
      //Busca el producto por ID
      let index = this.productos.findIndex((product) => {
        return product.id === id;
      });
      //Si el index es -1 es porque no existe el producto
      if (index === -1) {
        console.error(`No existe ningun producto con el id ${id}`);
        return;
      }
      //Si el codigo es distinto al codigo del producto que se quiere actualizar y el codigo ya existe entonces envia un mensaje de error
      if (code !== this.productos[index].code) {
        if (this.#ExisteCodigo(code)) {
          console.warn(`El producto con el codigo "${code}" ya fue ingresado`);
          return;
        }
      }
      //Actualiza los campos del producto
      this.productos[index] = {
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
        `El producto con el id ${id} fue actualizado correctamente a: `,
        this.productos[index]
      );
      return;
    } catch (error) {
      console.log('Error al actualizar producto', error);
    }
  }

  //Elimina un producto por ID
  async deleteProducto(id) {
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
        return;
      }
      //Elimina el producto del array
      productosJSON.splice(index, 1);
      //Le avisa al usuario que se elimino correctamente
      console.info(`El producto con el id ${id} fue eliminado correctamente`);
      await fs.promises.writeFile(this.path, JSON.stringify(productosJSON));
      return;
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
