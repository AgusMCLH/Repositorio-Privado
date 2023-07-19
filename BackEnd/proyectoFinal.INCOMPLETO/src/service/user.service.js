import { userModel } from '../models/users.model.js';
import { encriptPassword } from '../../tools/encript.tool.js';
import CM from './cart.service.js';

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
      const cartResponse = await CM.addCart();
      user.cartId = cartResponse.cartId;
      user.password = encriptPassword(user.password);
      return await this.model.create(user);
    } catch (error) {
      console.log(error);
    }
  }
}
const userService = new UserService();
export default userService;
