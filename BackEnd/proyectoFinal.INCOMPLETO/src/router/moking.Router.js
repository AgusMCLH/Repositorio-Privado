import CustomRouter from './customRouter/customRouter.js';
import { mockingController } from '../controller/mocking.controller.js';

export default class MockingRouter extends CustomRouter {
  init() {
    this.get('/', ['PUBLIC'], [], async (req, res) => {
      const products = await mockingController.generateProducts(100);
      res.json(products);
    });
  }
}
