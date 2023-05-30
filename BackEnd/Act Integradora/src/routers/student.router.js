import { Router } from 'express';
import { studentService } from '../services/student.service.js';

const studentRouter = Router();

studentRouter.get('/', async (req, res) => {
  try {
    const students = await studentService.getAllStudents();
    res.send(students);
  } catch (error) {
    res.status(500).send(error);
  }
});

studentRouter.post('/', async (req, res) => {
  const student = req.body;
  try {
    const studentAdd = await studentService.addStudent(student);
    res.send(studentAdd);
  } catch (error) {
    res.send(error);
  }
});

export default studentRouter;
