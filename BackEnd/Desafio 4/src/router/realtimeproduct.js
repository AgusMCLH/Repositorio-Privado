import { Router } from 'express';
import productManager from './../productManager.js';

const realTimeProducts = Router();

realTimeProducts.get('/', async (req, res) => {
  //Consigue el limite de productos a mostrar
  let limite = req.query.limit;
  //Llama a la funcion getProducts() de productManager para conseguir los productos
  let products = await productManager.getProducts();
  //Si el limite es distinto de undefined entonces carga los productos hasta el limite
  if (limite !== undefined) {
    products = products.slice(0, limite);
  }
  res.render('realtimeproducts', { emptyList: false, products });
});

export { realTimeProducts };
