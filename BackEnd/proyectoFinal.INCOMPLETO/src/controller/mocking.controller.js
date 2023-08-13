import generateProduct from '../utils/tools/generateProduct.js';

class MockingController {
  async generateProducts(quantity) {
    let products = [];
    for (let i = 0; i < quantity; i++) {
      const product = await generateProduct();
      products.push(product);
    }
    return products;
  }
}

export const mockingController = new MockingController();
