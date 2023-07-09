import { Router } from 'express';
import CM from '../service/cart.service.js';

const cartRouting = Router();
import { isAuth } from '../middleware/isAuth.middleware.js';

cartRouting.get('/:cid', isAuth, async (req, res) => {
  try {
    let productsQuantity = false;
    const idBuscado = req.params.cid;
    let cart = await CM.getCartByID(idBuscado);
    if (cart !== undefined) {
      productsQuantity = cart.products.length > 0;
      cart.products.forEach((product) => {
        if (product.product.thumbnail[0] === 'Sin foto') {
          product.product.hasPhoto = false;
        } else {
          product.product.hasPhoto = true;
        }
      });

      const user = req.session.user;
      res.render('cart', {
        title: 'cart',
        cart,

        productsQuantity,
        user,
      });
    }
  } catch (error) {
    console.log(error);
  }
});

cartRouting.post('/', async (req, res) => {
  let response = await CM.addCart();
  res.status(response.code).send(response.cartId);
});

cartRouting.post('/:cid/product/:pid', isAuth, async (req, res) => {
  await CM.addProductToCart(req.params.cid, req.params.pid);
  await CM.getCartByID(req.params.cid);
  res.redirect(`/api/carts/${req.params.cid}`);
});

cartRouting.delete('/cart/:cid/product/:pid', async (req, res) => {
  const productID = req.params.pid;
  const cartID = req.params.cid;
  const data = await CM.deleteProductFromCart(cartID, productID);

  res.send(data);
});

cartRouting.put('/carts/:cid', isAuth, async (req, res) => {
  const cartID = req.params.cid;
  const reqBody = req.body;
  const data = await CM.updateCart(cartID, reqBody);
  res.send(data);
});

export { cartRouting };
