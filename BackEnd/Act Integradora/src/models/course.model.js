import mongoose from 'mongoose';
import { studentSchema } from './student.model.js';

const couserSchema = new mongoose.Schema({
  name: String,
  year: Number,
  students: [studentSchema],
});

export const courseModel = mongoose.model('courses', couserSchema);
