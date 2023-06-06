import mongoose from 'mongoose';

const studentsSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: { type: String, unique: true },
  gender: {
    type: String,
  },
  grade: Number,
  group: String,
});

export const studentModel = mongoose.model('students', studentsSchema);
