import { Router } from 'express';
import productManager from './../productManager.js';

const productGetPost = Router();

productGetPost.get('/', async (req, res) => {
  //Consigue el limite de productos a mostrar
  let limite = req.query.limit;
  //Llama a la funcion getProducts() de productManager para conseguir los productos
  let products = await productManager.getProducts();
  //Si el limite es distinto de undefined entonces carga los productos hasta el limite
  if (limite !== undefined) {
    products = products.slice(0, limite);
  }
  //Finalmente envia los productos
  res
    .status(200)
    .send(
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
productGetPost.get('/:pid', async (req, res) => {
  //Recupera el ID pasado por parametro
  let idBuscado = req.params.pid;
  //Si el ID no es un numero entonces envia un mensaje de error
  if (isNaN(Number(idBuscado))) {
    res.status(400).send(`El ID ingresado no es un numero`);
    return;
  } else {
    //Si el ID es un numero entonces lo parsea a int
    idBuscado = parseInt(idBuscado);
  }
  //Llama a la funcion getProductByID() de productManager para conseguir el producto
  const product = await productManager.getProductByID(idBuscado);
  //Si el producto es igual a 'No existe ningun producto con el id NaN' entonces envia un mensaje de error
  console.log(product);
  if (product === `No existe ningun producto con el id ${idBuscado}`) {
    res.status(404).send(`No hay ningun producto con el ID: ${idBuscado}`);
  } else {
    //Si el producto es distinto a 'No existe ningun producto con el id NaN' entonces envia el producto
    res.status(200).send(`<p>${JSON.stringify(product)}</p>`);
  }
});

productGetPost.post('/', async (req, res) => {
  let response = await productManager.addProducts(req.body);
  res.status(response.code).send(response.msg);
});

productGetPost.put('/:pid', async (req, res) => {
  let idAEditar = Number(req.params.pid);
  req.body.idAEditar = idAEditar;
  let response = await productManager.updateProduct(req.body);
  res.status(response.code).send(response.msg);
});
productGetPost.delete('/:pid', async (req, res) => {
  let id = Number(req.params.pid);
  let response = await productManager.deleteProduct(id);
  res.status(response.code).send(response.msg);
});

export { productGetPost };
