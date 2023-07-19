import mongoose from 'mongoose';
import { productManager } from './mongo managers/productManager.js';
import productsData from './data/products.json' assert { type: 'json' };
import { cartManager } from './mongo managers/cartManager.js';
mongoose.connect();

const main = async () => {
  // const data = await productManager.addProduct({
  //   title: 'test',
  //   description: 'test',
  //   price: 1,
  //   thumbnail: 'test',
  //   code: 'test',
  //   stock: 1,
  //   visible: true,
  // });

  console.log(await cartManager.getCartByID('648100c518ef3e2216cdf7e2'));

  mongoose.disconnect();
};
main();
