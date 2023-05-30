import { courseModel } from '../models/course.model.js';
import { studentService } from './student.service.js';
class CourseService {
  constructor() {
    this.model = courseModel;
  }

  async addCourse(course) {
    course.students = [];
    return await this.model.create(course);
  }

  async getAllCourses() {
    return await this.model.find({}).lean();
  }

  async addStudentToCourse(courseId, studentId) {
    const course = await this.model.findOne({ _id: courseId });
    const student = await studentService.getStudentByID(studentId);
    course.students.push(student);
    return await course.save();
  }
}

export const courseService = new CourseService();
