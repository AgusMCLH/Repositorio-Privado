import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true, max: 40 },
  lastName: { type: String, required: true, max: 40 },
  email: { type: String, unique: true, required: true, max: 100, index: true },
  password: { type: String, required: true, max: 100 },
  role: {
    type: String,
    max: 20,
    default: 'usuario',
    enum: ['usuario', 'administrador'],
  },
});

export const userModel = mongoose.model('users', userSchema);
