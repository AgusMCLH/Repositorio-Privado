import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

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
    index: true,
  },
  stock: Number,
  visible: {
    type: Boolean,
    default: true,
  },
  category: String,
  owner: {
    type: String,
    default: 'Admin',
  },
});

productSchema.plugin(mongoosePaginate);

export const productModel = mongoose.model('products', productSchema);
