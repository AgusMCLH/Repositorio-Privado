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
  async getAllUsers() {
    return await this.dao.getUsers();
  }

  async getUserByEmail(email) {
    return await this.dao.getUserByEmail(email);
  }

  async addUser(user) {
    return await this.dao.addUser(user);
  }
  async updatePassword(id, password) {
    return await this.dao.updatePassword(id, password);
  }

  async switchPremium(id) {
    return await this.dao.switchPremium(id);
  }

  async updateUser(user) {
    const id = user._id;
    return await this.dao.updateUser(id, user);
  }
}
