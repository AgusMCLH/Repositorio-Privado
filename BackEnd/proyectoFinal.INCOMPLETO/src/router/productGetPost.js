import { Router } from 'express';
import productController from './../controller/products.controller.js';

const productGetPost = Router();

productGetPost.get('/', async (req, res) => {
  const { limit, page, sort, query } = req.query;

  let response = await productController.getProducts(limit, page, sort, query);
  const user = req.session.user;
  res.render('products', { title: 'Products', response, user });
});

productGetPost.get('/:pid', async (req, res) => {
  const idBuscado = req.params.pid;

  const productObj = await productController.getProductByID(idBuscado, req);
  if (productObj.msg !== undefined) {
    res.redirect('/404-page-not-found');
    return;
  }
  if (
    productObj.product === `No existe ningun producto con el id ${idBuscado}`
  ) {
    res.status(404).send(`No hay ningun producto con el ID: ${idBuscado}`);
  } else {
    const product = productObj.product;
    const hasImages = productObj.hasImages;
    const user = req.session.user;
    const AddtoCartURL = productObj.AddtoCartURL;
    res.render('productPage', { product, hasImages, user, AddtoCartURL });
  }
});

productGetPost.post('/', async (req, res) => {
  let response = await productController.addProduct(req.body);
  res.status(response.code).send(response.msg);
});

productGetPost.put('/:pid', async (req, res) => {
  let idAEditar = req.params.pid;

  let response = await productController.updateProduct(idAEditar, req.body);

  res.status(response.code).send(response.msg);
});
productGetPost.delete('/:pid', async (req, res) => {
  let id = req.params.pid;
  let response = await productController.deleteProduct(id);
  res.status(response.code).send(response.msg);
});

export { productGetPost };
