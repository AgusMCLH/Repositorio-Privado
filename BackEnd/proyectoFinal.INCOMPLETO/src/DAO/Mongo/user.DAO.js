import { userModel } from '../../models/users.model.js';

import userDTO from '../../DTOs/user.DTO.js';

class UserDAO {
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
      user = new userDTO(user);
      return await this.model.create(user);
    } catch (error) {
      console.log(error);
    }
  }
}

export const userDAO = new UserDAO();
