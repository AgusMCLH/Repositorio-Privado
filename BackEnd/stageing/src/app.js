import mongoose from 'mongoose';
import { studentModel } from './models/student.model.js';
import dataStudents from './data/students.json' assert { type: 'json' };

mongoose.connect();

// const data = await studentModel.insertMany(dataStudents);

// const data = await studentModel.aggregate([
//   { $group: { _id: '$group', promedio: { $avg: '$grade' } } },
//   { $sort: { promedio: -1 } },
// ]);

const data = await studentModel.count();

console.log(data);

mongoose.disconnect();
