import generateProduct from '../../tools/generateProduct.js';

class MockingController {
  async generateProducts(quantity) {
    let products = [];
    console.log('generating products');
    for (let i = 0; i < quantity; i++) {
      const product = await generateProduct();
      products.push(product);
    }
    return products;
  }
}

export const mockingController = new MockingController();
