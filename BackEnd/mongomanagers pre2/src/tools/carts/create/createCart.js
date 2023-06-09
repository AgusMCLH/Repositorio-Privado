import { cartModel } from '../models/cart.model';

const data = await cartModel.create({
  products: [
    { product: '6480e4bd195525c16bda7aa8', quantity: 1 },
    { product: '6480e4bd195525c16bda7aa9', quantity: 1 },
  ],
});

console.log(data);
