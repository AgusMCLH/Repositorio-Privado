import { Router } from 'express';
import CM from '../MongoManagers/cartManager.js';

const cartRouting = Router();

cartRouting.get('/:cid', async (req, res) => {
  try {
    let exists = false;
    let productsQuantity = false;
    const idBuscado = req.params.cid;
    let cart = await CM.getCartByID(idBuscado);
    if (cart !== undefined) {
      if (cart.code === 400) {
        return res.status(400).send(cart.msg);
      } else {
        exists = true;
        productsQuantity = cart.products.length > 0;
        cart.products.forEach((product) => {
          if (product.product.thumbnail[0] === 'Sin foto') {
            product.product.hasPhoto = false;
          } else {
            product.product.hasPhoto = true;
          }
          console.log(product);
        });
      }
      res.render('cart', {
        title: 'cart',
        cart,
        exists,
        productsQuantity,
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
