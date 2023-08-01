import { purchaseModel } from '../models/purchase.model.js';

class Purchases {
  async addPurchase({ code, amount, purchaser }) {
    try {
      const response = await purchaseModel.create({
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
      return await purchaseModel.find();
    } catch (error) {
      return { code: 500, msg: `Error de servidor - ${error}` };
    }
  }

  async getByCode(code) {
    try {
      return await purchaseModel.find({ code: code });
    } catch (error) {
      console.log(error);
    }
  }
}

export const purchasesService = new Purchases();
