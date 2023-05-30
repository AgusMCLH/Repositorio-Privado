import { studentModel } from '../models/student.model.js';

class StudentService {
  constructor() {
    this.model = studentModel;
  }

  async getAllStudents() {
    return await this.model.find({}).lean();
  }

  async addStudent(student) {
    return await this.model.create(student);
  }

  async removeStudent(id) {
    return await this.model.deleteOne(id);
  }

  async getStudentByID(studentId) {
    return await this.model.findOne({ _id: studentId });
  }
}

export const studentService = new StudentService();
