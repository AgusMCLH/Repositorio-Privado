import { Router } from 'express';
import CM from '../MongoManagers/cartManager.js';

const testRouter = Router();

testRouter.put('/carts/:cid/product/:pid', async (req, res) => {
  const cartID = req.params.cid;
  const productID = req.params.pid;
  const reqQuantity = req.body.quantity;
  console.log(
    'reqQuantity: ',
    reqQuantity,
    'productID: ',
    productID,
    'cartID: ',
    cartID
  );
  const data = await CM.editProductQuantity(cartID, productID, reqQuantity);
  console.log(data);
  res.send(data);
});

export { testRouter };
