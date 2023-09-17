import { userModel } from '../../models/users.model.js';
import { logger } from './../../middleware/logger.middleware.js';

import userDTO from '../../DTOs/user.DTO.js';

class UserDAO {
  constructor() {
    this.model = userModel;
  }

  async getById(id) {
    try {
      return await this.model.findById(id);
    } catch (error) {
      logger.error(error);
    }
  }

  async getUsers() {
    try {
      return await this.model.find({});
    } catch (error) {
      logger.error(error);
    }
  }

  async getUserByEmail(email) {
    try {
      return await this.model.findOne({ email: email });
    } catch (error) {
      logger.error(error);
    }
  }

  async addUser(user) {
    try {
      user = new userDTO(user);
      return await this.model.create(user);
    } catch (error) {
      logger.error(error);
    }
  }

  async updatePassword(id, password) {
    try {
      const user = await this.getById(id);
      user.password = password;
      return await user.save();
    } catch (error) {
      logger.error(error);
    }
  }

  async switchPremium(id) {
    try {
      const user = await this.getById(id);
      logger.debug(`user: ${user}`);
      if (user) {
        if (user.premium) {
          user.premium = false;
        } else {
          user.premium = true;
        }
        await user.save();
        logger.debug('user premium', user.premium);
        return user.premium;
      }
      return 'Usuario no encontrado';
    } catch (error) {
      logger.error(error);
    }
  }

  async updateUser(id, user) {
    try {
      return await this.model.findByIdAndUpdate(id, user);
    } catch (error) {
      logger.error(error);
    }
  }
}

export const userDAO = new UserDAO();
