class Producto {
  //Declaro el constructor y el ID de la clase de forma privada
  #id = 0;
  constructor() {
    this.productos = [];
  }

  //Funcion de agregar producto, recibe los campos, los valida. y si esta bien los agrega al array de productos, sino lanza un mensaje de error
  addProducts(title, description, price, thumbnail, code, stock) {
    if (
      title === undefined ||
      description === undefined ||
      price === undefined ||
      thumbnail === undefined ||
      code === undefined ||
      stock === undefined
    ) {
      //Si alguno de los campos esta vacio el sistema se lo hace saber al usuario
      console.log(
        `El producto con el codigo "${code}" no fue ingresado - Algun campo esta vacio`
      );
      return;
    }
    //Utiliza la funcion privada de Existe codigo para verificar que no exista el producto en el array
    if (this.#ExisteCodigo(code)) {
      console.log(`El producto con el codigo "${code}" ya fue ingresado`);
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
    console.log(
      `El producto de codigo: ${producto.code} fue agregado con el id: ${producto.id}`
    );
    return;
  }

  //Retorna todos los productos
  getProducts() {
    return this.productos;
  }

  //Recibe un ID y lo busca si el index es -1 (Es decir que no existe) entonces envia un mensaje de error
  getProductByID(id) {
    let index = this.productos.findIndex((product) => {
      return product.id === id;
    });

    return index !== -1
      ? this.productos[index]
      : `No existe ningun producto con el id ${id}`;
  }

  //Devuelve el contenido de ID y luego suma 1
  #getID() {
    const auxiliarID = this.#id;
    this.#id++;
    return auxiliarID;
  }

  //Comprueba que exista un producto con un codigo que se le pase como prop
  #ExisteCodigo(codigo) {
    let index = this.productos.findIndex((product) => {
      return product.code === codigo;
    });
    return index !== -1 ? true : false;
  }
}

//Test
//Agrego 3 casos correctos
const productManager = new Producto();
productManager.addProducts(
  'Nissan Qashqai',
  'QASHQAI EXCLUSIVE 2.0 4X4 AT',
  24900,
  'No existe',
  'NissQashqai',
  1
);

productManager.addProducts(
  'Chevrolet Tracker',
  'TRACKER 1.2T LTZ AT',
  27200,
  'No existe',
  'ChevTracker1.2',
  1
);
productManager.addProducts(
  'Volkswagen TIGUAN',
  'TIGUAN 2.0 TFSI HIGHLINE TECHO 4X4',
  48500,
  'No existe',
  'VolksTIGUAN',
  1
);

//Intento Agregar un producto sin el campo de stock
productManager.addProducts(
  'Renault Duster',
  'DUSTER ZEN 1.6',
  20500,
  'No existe',
  'RenDust'
);

//Intento agregar un producto que ya existe
productManager.addProducts(
  'Nissan Qashqai',
  'QASHQAI EXCLUSIVE 2.0 4X4 AT',
  24900,
  'No existe',
  'NissQashqai',
  1
);

//Llamo a todos los productos

console.log(
  '\n---------------------\nLos productos son:\n\n',
  productManager.getProducts(),
  '\n---------------------\n'
);

//Llamo a un producto con un id especifico

console.log(`el producto buscado es:\n`, productManager.getProductByID(1));
