import CustomRouter from './customRouter/customRouter.js';
import productController from './../controller/products.controller.js';
import { logger } from '../middleware/logger.middleware.js';

export default class ProductsRouter extends CustomRouter {
  init() {
    this.get('/', ['PUBLIC'], [], async (req, res) => {
      const { limit, page, sort, query } = req.query;
      let response = await productController.getProducts(
        limit,
        page,
        sort,
        query
      );
      const user = req.session.user;
      res.render('products', { title: 'Products', response, user });
    });

    this.get('/:pid', ['PUBLIC'], [], async (req, res) => {
      const idBuscado = req.params.pid;
      const productObj = await productController.getProductByID(idBuscado, req);
      if (productObj.msg !== undefined) {
        res.redirect('/404-page-not-found');
        return;
      }
      if (
        productObj.product ===
        `No existe ningun producto con el id ${idBuscado}`
      ) {
        res.status(404).send(`No hay ningun producto con el ID: ${idBuscado}`);
      } else {
        const { product, hasImages, AddtoCartURL } = productObj;
        const user = req.session.user;
        if (product.owner === user.email) {
          product.visible = false;
        }
        res.render('productPage', { product, hasImages, user, AddtoCartURL });
      }
    });

    this.post('/', ['ADMINISTRADOR'], [], async (req, res) => {
      let response = await productController.addProduct(req.body);
      res.status(response.code).send(response.msg);
    });

    this.put('/:pid', ['ADMINISTRADOR'], [], async (req, res) => {
      let idAEditar = req.params.pid;

      let response = await productController.updateProduct(idAEditar, req.body);

      res.status(response.code).send(response.msg);
    });

    this.delete('/:pid', ['ADMINISTRADOR'], [], async (req, res) => {
      let id = req.params.pid;
      let response = await productController.deleteProduct(id);
      res.status(response.code).send(response.msg);
    });

    this.get('/:pid/json', ['PUBLIC'], [], async (req, res) => {
      const idBuscado = req.params.pid;
      const productObj = await productController.getProductByID(idBuscado, req);
      if (
        productObj.product ===
        `No existe ningun producto con el id ${idBuscado}`
      ) {
        res.status(404).json({ error: productObj.product });
      } else {
        logger.debug(`Product ${idBuscado} found: ${productObj.product}`);
        res.status(200).json(productObj.product);
      }
    });
  }
}
