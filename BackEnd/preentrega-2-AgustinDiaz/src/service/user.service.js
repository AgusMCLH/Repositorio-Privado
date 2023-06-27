import { userModel } from '../models/users.model.js';
import { encriptPassword } from '../../tools/encript.tool.js';

class UserService {
  constructor() {
    this.model = userModel;
  }

  async getById(id) {
    try {
      return await this.model.findById(id);
    } catch (error) {
      console.log(error);
    }
  }

  async getUsers() {
    try {
      return await this.model.find({});
    } catch (error) {
      console.log(error);
    }
  }

  async getUserByEmail(email) {
    try {
      return await this.model.findOne({ email: email });
    } catch (error) {
      console.log(error);
    }
  }

  async addUser(user) {
    try {
      console.log(user);
      user.password = encriptPassword(user.password);
      console.log('encriptedProfile', user);
      return await this.model.create(user);
    } catch (error) {
      if (error.code === 11000) {
        return {
          code: 400,
          message: 'Email already in use',
        };
      }
      console.log(error);
    }
  }
}
const userService = new UserService();
export default userService;
