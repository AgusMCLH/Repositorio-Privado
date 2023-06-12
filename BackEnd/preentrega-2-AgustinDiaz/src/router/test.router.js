import { Router } from 'express';
import CM from '../MongoManagers/cartManager.js';

const testRouter = Router();

testRouter.put('/carts/:cid', async (req, res) => {
  const cartID = req.params.cid;

  const reqBody = req.body;
  console.log(reqBody);
  const data = await CM.updateCart(cartID, reqBody);
  console.log(data);
  res.send(data);
});

export { testRouter };
