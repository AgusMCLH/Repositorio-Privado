import { productModel } from '../../../models/productModel.js';

const productosData = async () => {
  const data = await productModel.create(productosData);
  return data;
};
