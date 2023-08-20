import mongoose from 'mongoose';

const recoverySchema = new mongoose.Schema({
  fechaCreacion: { type: Date, default: Date.now },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
});

export const recoveryModel = mongoose.model(
  'recoverypasscodes',
  recoverySchema
);
