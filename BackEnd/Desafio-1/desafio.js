class Producto {
  #id = 0;
  constructor() {
    this.productos = [];
  }

  addProducts(title, description, price, thumbnail, code, stock) {
    if (
      title.length === 0 ||
      description.length === 0 ||
      price.length === 0 ||
      thumbnail.length === 0 ||
      code.length === 0 ||
      stock.length === 0
    ) {
      console.log(
        `el producto con el codigo "${code}" no fue ingresado - Algun campo esta vacio`
      );
      return;
    }
    if (this.#ExisteCodigo(code)) {
      console.log(`el producto con el codigo "${code}" ya fue ingresado`);
      return;
    }
    const producto = {
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };
    producto.id = this.#getID();
    this.productos.push(producto);
    console.log(
      `producto de codigo: ${producto.code} fue agregado con el id: ${producto.id}`
    );
    return;
  }

  getProducts() {
    return this.productos;
  }

  getProductByID(id) {
    let index = this.productos.findIndex((product) => {
      return product.id === id;
    });
    return this.productos[index];
  }

  #getID() {
    const auxiliarID = this.#id;
    this.#id++;
    return auxiliarID;
  }

  #ExisteCodigo(codigo) {
    let index = this.productos.findIndex((product) => {
      return product.code === codigo;
    });
    return index !== -1 ? true : false;
  }
}

//Test

const productManager = new Producto();
productManager.addProducts(
  'Ferrari',
  'Auto Piola',
  200000,
  'No hay bro',
  'F120',
  1
);

productManager.addProducts(
  'hteah',
  'Auto Piola',
  200000,
  'No hay bro',
  'arha',
  1
);
productManager.addProducts(
  'hteah',
  'Auto Piola',
  200000,
  'No hay bro',
  'arha',
  1
);
productManager.addProducts('awewr', 'Auto Piola', 200000, '', 'ktdty', 1);

console.log(
  '\n---------------------\nLos productos son:\n\n',
  productManager.getProducts()
);

console.log('el producto buscado es:\n', productManager.getProductByID(1));
