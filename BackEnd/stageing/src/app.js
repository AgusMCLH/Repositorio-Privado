import mongoose from 'mongoose';
import { studentModel } from './models/student.model.js';
import dataStudents from './data/students.json' assert { type: 'json' };

mongoose.connect(
  'mongodb+srv://agustindiaz980:Fecha1990@cluster0.otb4efz.mongodb.net/?retryWrites=true&w=majority'
);

// const data = await studentModel.insertMany(dataStudents);

const data = await studentModel.aggregate([
  { $group: { _id: '$group', promedio: { $avg: '$grade' } } },
  { $sort: { promedio: -1 } },
]);

console.log(data);

mongoose.disconnect();
