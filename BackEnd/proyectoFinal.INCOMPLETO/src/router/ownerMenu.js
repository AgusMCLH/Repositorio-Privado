import CustomRouter from './customRouter/customRouter.js';
import isPremium from '../middleware/IsPremium.middleware.js';
import productController from '../controller/products.controller.js';
import OwnerProductDTO from '../DTOs/ownerproduct.DTO.js';

export default class OwnerMenuRouter extends CustomRouter {
  init() {
    this.get('/', ['PUBLIC'], [isPremium], async (req, res) => {
      let user = req.session.user;
      console.log(user.email);
      const products = await productController.getProductByOwner(user.email);
      res.render('ownerMenu', { title: 'Owner Menu', user, products });
    });
    this.post('/insertproduct', ['PUBLIC'], [isPremium], async (req, res) => {
      const user = req.session.user;
      const productToSend = new OwnerProductDTO(req.body, user.email);
      console.log(productToSend);

      let response = await productController.addProduct(productToSend);
      console.log(response);
      return res.json(response).status(200);
    });
  }
}
