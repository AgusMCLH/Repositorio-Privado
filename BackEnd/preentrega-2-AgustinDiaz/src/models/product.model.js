import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  thumbnail: {
    type: Array,
    default: ['Sin foto'],
  },
  code: {
    type: String,
    unique: true,
  },
  stock: Number,
  visible: {
    type: Boolean,
    default: true,
  },
});

export const productModel = mongoose.model('products', productSchema);
