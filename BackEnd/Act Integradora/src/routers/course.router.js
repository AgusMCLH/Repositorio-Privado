import { Router } from 'express';
import { courseService } from '../services/course.service.js';

const courseRouter = Router();

courseRouter.get('/', async (req, res) => {
  try {
    const courses = await courseService.getAllCourses();
    console.log(courses);
    res.send(courses);
  } catch (error) {
    res.send(error);
  }
});

courseRouter.post('/', async (req, res) => {
  const course = req.body;
  try {
    const courseAdded = await courseService.addCourse(course);
    res.send(courseAdded);
  } catch (error) {
    res.send(error);
  }
});
courseRouter.post('/:courseId', async (req, res) => {
  const { courseId } = req.params;
  try {
    const studentAdded = await courseService.addStudentToCourse(
      courseId,
      req.body.studentId
    );
    res.send(studentAdded);
  } catch (error) {
    res.send(error);
  }
});

export default courseRouter;
