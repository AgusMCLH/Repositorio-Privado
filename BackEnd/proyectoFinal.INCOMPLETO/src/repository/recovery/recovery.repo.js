export default class RecoveryRepository {
  constructor(dao) {
    this.dao = dao;
  }

  async createCode(id) {
    return await this.dao.createCode(id);
  }

  async getById(id) {
    return await this.dao.getById(id);
  }

  async getByUserId(id) {
    return await this.dao.getByUserId(id);
  }

  async deleteById(id) {
    return await this.dao.deleteById(id);
  }
}
