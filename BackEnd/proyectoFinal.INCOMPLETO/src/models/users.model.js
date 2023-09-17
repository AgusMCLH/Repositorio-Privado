import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  firstName: { type: String, max: 40 },
  lastName: { type: String, max: 40 },
  email: { type: String, unique: true, max: 100, index: true },
  password: { type: String },
  role: {
    type: String,
    max: 20,
    default: 'usuario',
    enum: ['usuario', 'administrador'],
  },
  cartId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'carts',
    required: true,
    unique: true,
  },
  premium: { type: Boolean, default: false },
  documents: [{ name: { type: String }, reference: { type: String } }],
  lastConnection: { type: Date, default: Date.now() },
});

export const userModel = mongoose.model('users', userSchema);
