import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
  products: {
    default: [],
    type: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'products',
        },
        quantity: Number,
      },
    ],
  },
});

cartSchema.pre('find', function () {
  this.populate('products.product');
});

export const cartModel = mongoose.model('carts', cartSchema);
