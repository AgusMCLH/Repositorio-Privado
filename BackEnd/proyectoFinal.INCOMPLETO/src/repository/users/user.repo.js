export default class UserRepository {
  constructor(dao) {
    this.dao = dao;
  }

  async getById(id) {
    return await this.dao.getById(id);
  }

  async getUsers() {
    return await this.dao.getUsers();
  }

  async getUserByEmail(email) {
    return await this.dao.getUserByEmail(email);
  }

  async addUser(user) {
    return await this.dao.addUser(user);
  }
}
