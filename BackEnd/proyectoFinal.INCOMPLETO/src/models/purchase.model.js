import mongoose from 'mongoose';

const purchaseSchema = new mongoose.Schema({
  code: { type: String, max: 40, index: true, unique: true },
  purchase_datetime: { type: Date, default: Date.now },
  amount: { type: Number },
  purchaser: {
    type: String,
  },
});

export const purchaseModel = mongoose.model('purchases', purchaseSchema);
