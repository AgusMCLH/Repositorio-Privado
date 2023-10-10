import CustomRouter from './customRouter/customRouter.js';
import isPremium from '../middleware/IsPremium.middleware.js';
import productController from '../controller/products.controller.js';
import OwnerProductDTO from '../DTOs/ownerproduct.DTO.js';
import OwnerProductUpdateDTO from '../DTOs/ownerproductUpdate.DTO.js';
import { logger } from '../middleware/logger.middleware.js';

export default class OwnerMenuRouter extends CustomRouter {
  init() {
    this.get('/', ['PUBLIC'], [isPremium], async (req, res) => {
      let user = req.session.user;
      let products = await productController.getProductByOwner(user.email);
      if (req.session.user.role === 'administrador') {
        products = await productController.getAllProducts();
      }
      res.render('ownerMenu', { title: 'Owner Menu', user, products });
    });
    this.post('/insertproduct', ['PUBLIC'], [isPremium], async (req, res) => {
      const user = req.session.user;
      const productToSend = new OwnerProductDTO(req.body, user.email);
      let response = await productController.addProduct(productToSend);
      return res.json(response).status(200);
    });
    this.put('/updateproduct', ['PUBLIC'], [isPremium], async (req, res) => {
      const productToSend = new OwnerProductUpdateDTO(req.body);
      let response = await productController.updateProduct(
        req.body.id,
        productToSend
      );
      return res.json(response).status(200);
    });
    this.delete('/deleteproduct', ['PUBLIC'], [isPremium], async (req, res) => {
      let response = await productController.deleteOwnerProduct(
        req.body.id,
        req
      );
      return res.json(response).status(200);
    });
  }
}
