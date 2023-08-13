import { purchaseModel } from '../../models/purchase.model.js';
import { logger } from './../../middleware/logger.middleware.js';

class PurchasesDAO {
  constructor() {
    this.model = purchaseModel;
  }
  async addPurchase({ code, amount, purchaser }) {
    try {
      const response = await this.model.create({
        code,
        amount,
        purchaser,
      });
      return {
        code: 201,
        msg: `La compra fue agregada con el id: ${response._id}`,
      };
    } catch (error) {
      return {
        code: 500,
        msg: `Error de servidor - ${error}`,
      };
    }
  }
  async getAllPurchases() {
    try {
      return await this.model.find();
    } catch (error) {
      return { code: 500, msg: `Error de servidor - ${error}` };
    }
  }

  async getByCode(code) {
    try {
      return await this.model.find({ code: code });
    } catch (error) {
      logger.error(error);
    }
  }
}

export const purchasesDAO = new PurchasesDAO();
