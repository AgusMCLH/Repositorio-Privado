import { Router } from 'express';
import CM from '../cartManager.js';

const cartRouting = Router();

cartRouting.get('/:cid', async (req, res) => {
  const idBuscado = Number(req.params.cid);
  const cart = await CM.getCartByID(idBuscado);
  console.log(idBuscado);
  res.send(`<p>${JSON.stringify(cart)}</p>`);
});

cartRouting.post('/', async (req, res) => {
  let response = await CM.addCart();
  res.status(response.code).send(response.msg);
});
cartRouting.post('/:cid/product/:pid', async (req, res) => {
  let response = await CM.addProductToCart(
    Number(req.params.cid),
    Number(req.params.pid)
  );
  res.status(response.code).send(response.msg);
});

export { cartRouting };
