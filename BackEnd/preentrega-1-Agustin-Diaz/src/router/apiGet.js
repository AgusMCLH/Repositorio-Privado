import { Router } from 'express';
import productManager from './../productManager.js';

const productRouter = Router();

productRouter.get('/', async (req, res) => {
  //Consigue el limite de productos a mostrar
  let limite = req.query.limit;
  //Llama a la funcion getProducts() de productManager para conseguir los productos
  let products = await productManager.getProducts();
  //Si el limite es distinto de undefined entonces carga los productos hasta el limite
  if (limite !== undefined) {
    products = products.slice(0, limite);
  }
  //Finalmente envia los productos
  res.send(
    `<p>${JSON.stringify(products)}</p><br> <p>cantidad: ${
      products.length
    }</p><br> ${
      limite !== undefined
        ? `<p>limite: ${limite}</p>`
        : 'Mostrando todos los productos'
    }`
  );
});

// Declaro el endpoint /api/get/:id en caso de que pasen un ID
productRouter.get('/:pid', async (req, res) => {
  //Recupera el ID pasado por parametro
  let idBuscado = req.params.pid;
  //Si el ID no es un numero entonces envia un mensaje de error
  if (isNaN(Number(idBuscado))) {
    res.send(`El ID ingresado no es un numero`);
    return;
  } else {
    //Si el ID es un numero entonces lo parsea a int
    idBuscado = parseInt(idBuscado);
  }
  //Llama a la funcion getProductByID() de productManager para conseguir el producto
  const product = await productManager.getProductByID(idBuscado);
  //Si el producto es igual a 'No existe ningun producto con el id NaN' entonces envia un mensaje de error
  if (product === 'No existe ningun producto con el id NaN') {
    res.send(`No hay ningun producto con el ID: ${idBuscado}`);
  } else {
    //Si el producto es distinto a 'No existe ningun producto con el id NaN' entonces envia el producto
    res.send(`<p>${JSON.stringify(product)}</p>`);
  }
});

export { productRouter };
