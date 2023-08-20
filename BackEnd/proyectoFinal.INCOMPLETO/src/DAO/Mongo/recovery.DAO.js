import { recoveryModel } from '../../models/recPassCode.model.js';
import { logger } from './../../middleware/logger.middleware.js';

class RecoveryDAO {
  constructor() {
    this.model = recoveryModel;
  }
  async createCode({ _id }) {
    try {
      const response = await this.model.create({
        user: _id,
      });
      return response;
    } catch (error) {
      return `error ${error}`;
    }
  }
  //Para buscar el codigo cuando el usuario hace click en el link
  async getById(id) {
    try {
      return this.model.findById(id);
    } catch (error) {
      return `error ${error}`;
    }
  }
  //Para buscar si hay un codigo para ese usuario
  async getByUserId(id) {
    try {
      return this.model.findOne({ user: id });
    } catch (error) {
      return `error ${error}`;
    }
  }
  //Para borrar el codigo cuando el usuario cambia la contraseña y si esta duplicado
  async deleteById(id) {
    try {
      return this.model.findByIdAndDelete(id);
    } catch (error) {
      return `error ${error}`;
    }
  }
}

export const recoveryDAO = new RecoveryDAO();
