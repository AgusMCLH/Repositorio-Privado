import { Router } from 'express';
import { ownCart } from '../middleware/ownCart.middleware.js';
import CM from '../service/cart.service.js';
import cartController from '../controller/cart.controller.js';

const cartRouting = Router();
import { isAuth } from '../middleware/isAuth.middleware.js';

cartRouting.get('/:cid', isAuth, ownCart, async (req, res) => {
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

cartRouting.post('/', async (req, res) => {
  let response = await cartController.addCart();
  res.status(response.code).send(response.cartId);
});

cartRouting.post('/:cid/product/:pid', isAuth, async (req, res) => {
  await cartController.addProductToCart(req.params.cid, req.params.pid, req);

  res.redirect(`/api/carts/${req.params.cid}`);
});

cartRouting.delete('/cart/:cid/product/:pid', async (req, res) => {
  const productID = req.params.pid;
  const cartID = req.params.cid;
  const data = await cartController.deleteProductFromCart(cartID, productID);

  res.send(data);
});

cartRouting.put('/carts/:cid', isAuth, async (req, res) => {
  const cartID = req.params.cid;
  const reqBody = req.body;
  const data = await CM.updateCart(cartID, reqBody);
  res.send(data);
});

export { cartRouting };
