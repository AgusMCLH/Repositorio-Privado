export default class PurchasesRepository {
  constructor(dao) {
    this.dao = dao;
  }
  async addPurchase(purchase) {
    return await this.dao.addPurchase(purchase);
  }

  async getAllPurchases() {
    return await this.dao.getAllPurchases();
  }

  async getByCode(code) {
    return await this.dao.getByCode(code);
  }
}
