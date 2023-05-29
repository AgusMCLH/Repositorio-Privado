import { UserModel } from '../models/user.model.js';

class UserService {
  constructor() {
    this.model = UserModel;
  }

  async getAll() {
    return await this.model.find({});
  }

  async addUser(user) {
    if (!user.name || !user.lastname || !user.email || !user.password) {
      throw new Error('Missing fields');
    }
    return await this.model.create(user);
  }

  updateUser(uid, user) {
    if (!uid) {
      throw new Error('Missing uid');
    }
    console.log(uid);
    return this.model.UpdateOne({ _id: uid }, user);
  }
}

const userService = new UserService();
export default userService;
