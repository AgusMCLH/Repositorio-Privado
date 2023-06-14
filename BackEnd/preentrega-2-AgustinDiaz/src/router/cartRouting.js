import { Router } from 'express';
import CM from '../MongoManagers/cartManager.js';

const cartRouting = Router();

cartRouting.get('/:cid', async (req, res) => {
  let exists = false;
  let productsQuantity = false;
  const idBuscado = req.params.cid;
  const cart = JSON.parse(await CM.getCartByID(idBuscado))[0];
  console.log(JSON.stringify(cart));
  if (cart.code !== 400) {
    exists = true;
    productsQuantity = cart.products.length > 0;
  }
  res.render('cart', {
    title: 'cart',
    cart,
    exists,
    productsQuantity,
  });
});

cartRouting.post('/', async (req, res) => {
  let response = await CM.addCart();
  res.status(response.code).send(response.cartId);
});

cartRouting.post('/:cid/product/:pid', async (req, res) => {
  let response = await CM.addProductToCart(req.params.cid, req.params.pid);
  res.status(response.code).send(response.msg);
});

cartRouting.delete('/cart/:cid/product/:pid', async (req, res) => {
  const productID = req.params.pid;
  const cartID = req.params.cid;
  const data = await CM.deleteProductFromCart(cartID, productID);

  res.send(data);
});

cartRouting.put('/carts/:cid', async (req, res) => {
  const cartID = req.params.cid;

  const reqBody = req.body;
  console.log(reqBody);
  const data = await CM.updateCart(cartID, reqBody);
  console.log(data);
  res.send(data);
});

export { cartRouting };
