import { cartModel } from '../models/cart.model';

const data = await cartModel.find().populate('products.product');
console.log(JSON.stringify(data, null, '\t'));
