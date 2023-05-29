import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  lastname: String,
  email: { type: String, unique: true },
  password: String,
});

export const UserModel = mongoose.model('user', userSchema);
