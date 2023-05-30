import { Router } from 'express';
import { studentService } from '../services/student.service.js';

const viewsRouter = Router();

viewsRouter.use('/', async (req, res) => {
  try {
    const studentsp = await studentService.getAllStudents();
    const students = studentsp.map((student) => {
      return student;
    });
    res.render('students', { students });
  } catch (error) {
    res.render('error');
  }
});

export default viewsRouter;
