const fs = require('fs');

class Producto {
  //Declaro el constructor y el ID de la clase de forma privada
  #id = 0;
  constructor() {
    this.productos = [];
    this.path = './productos.json';
    this.#crearArchivo();
  }
  #crearArchivo = async () => {
    await fs.promises.writeFile(this.path, '[]');
    return;
  };

  //Funcion de agregar producto, recibe los campos, los valida. y si esta bien los agrega al array de productos, sino lanza un mensaje de error
  async addProducts(title, description, price, thumbnail, code, stock) {
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
      };
      //Agrega el atributo id al producto a travez de una funcion que le devuelve el ID a utilizar
      producto.id = this.#getID();
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
      if (productosJSON[0] === undefined) {
        console.error('no hay productos cargados', productosJSON);
        return;
      }
      console.log(productosJSON);
      return;
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
        console.log(`\nEl producto buscado es:`);
        //Esta separado porque por alguna razon no funciona si lo pongo en una sola linea
        console.log(productosJSON[index]);
      } else if (index === -1) {
        console.error(`No existe ningun producto con el id ${id}`);
      }

      return;
    } catch (error) {
      console.log('Error al obtener producto por ID', error);
    }
  }

  //Devuelve el contenido de ID y luego suma 1
  #getID() {
    const auxiliarID = this.#id;
    this.#id++;
    return auxiliarID;
  }

  //Actualiza el producto, recibe el ID, y los campos a actualizar
  async updateProduct(id, title, description, price, thumbnail, code, stock) {
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
      //Actualiza los campos del producto
      productosJSON[index].title = title;
      productosJSON[index].description = description;
      productosJSON[index].price = price;
      productosJSON[index].thumbnail = thumbnail;
      productosJSON[index].code = code;
      productosJSON[index].stock = stock;
      //Le avisa al usuario que se actualizo correctamente
      console.info(
        `El producto con el id ${id} fue actualizado correctamente a: ${productosJSON[index].title}`
      );
      await fs.promises.writeFile(this.path, JSON.stringify(productosJSON));
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

const testing = async () => {
  //Test
  const productManager = new Producto();
  await productManager.getProducts();

  await productManager.addProducts(
    'producto prueba',
    'Este es un producto prueba',
    200,
    'Sin imagen',
    'abc123',
    25
  );
  await productManager.getProducts();
  await productManager.addProducts(
    'producto prueba',
    'Este es un producto prueba',
    200,
    'Sin imagen',
    'abc123',
    25
  );
  await productManager.addProducts(
    'producto prueba2',
    'Este es un producto prueba',
    200,
    'Sin imagen',
    'abc124',
    25
  );
  await productManager.getProducts();
  await productManager.getProductByID(1);
  await productManager.getProductByID(2);
  await productManager.updateProduct(
    0,
    'producto prueba 1 actualizado',
    'Este es un producto prueba',
    200,
    'Sin imagen',
    'abc124',
    25
  );
  await productManager.getProductByID(0);
  await productManager.getProducts();
  await productManager.deleteProducto(0);
  await productManager.deleteProducto(1);
};

testing();

// const a = async () => {
//   const productManager = new Producto();
//   await productManager.getProducts();
// };
// a();
