import CustomRouter from './customRouter/customRouter.js';
import { ownCart } from '../middleware/ownCart.middleware.js';
import cartController from '../controller/cart.controller.js';
import { purchasesController } from '../controller/purchase.controller.js';
import ProductToAddToCartDTO from '../DTOs/productToAddToCart.DTO.js';
import { logger } from '../middleware/logger.middleware.js';

export default class CartRouting extends CustomRouter {
  init() {
    this.get('/:cid', ['USUARIO'], [ownCart], async (req, res) => {
      const idBuscado = req.params.cid;
      let cart = await cartController.getCartByID(idBuscado);
      const productsQuantity = cart.productsQuantity;
      const user = req.session.user;
      res.render('cart', {
        title: 'cart',
        cart,
        productsQuantity,
        user,
      });
    });

    this.post('/', ['SYSTEM'], [], async (req, res) => {
      let response = await cartController.addCart();
      res.status(response.code).send(response.cartId);
    });

    this.post('/:cid/product/:pid', ['USUARIO'], [], async (req, res) => {
      const productToAddToCart = new ProductToAddToCartDTO(req);
      if (productToAddToCart.owner === req.session.user.email) {
        return;
      }
      await cartController.addProductToCart(productToAddToCart);
      res.redirect(`/api/carts/${req.params.cid}`);
    });

    this.delete('/:cid/product/:pid', ['USUARIO'], [], async (req, res) => {
      const productID = req.params.pid;
      const cartID = req.params.cid;
      const response = await cartController.deleteProductFromCart(
        cartID,
        productID
      );
      logger.debug(JSON.stringify(response));
      res.status(response.code).send(response.msg);
    });

    this.put('/:cid', ['USUARIO'], [], async (req, res) => {
      const cartID = req.params.cid;
      const reqBody = req.body;
      const data = await cartController.updateCart(cartID, reqBody);
      res.send(data);
    });

    this.get('/:cid/purchase', ['PUBLIC'], [], async (req, res) => {
      const cartID = req.params.cid;
      const user = req.session.user;
      const cart = await cartController.getCartByID(cartID);
      const response = await purchasesController.addPurchase(cart, user);
      res.status(response.code).render('purchase', { user });
    });
  }
}
