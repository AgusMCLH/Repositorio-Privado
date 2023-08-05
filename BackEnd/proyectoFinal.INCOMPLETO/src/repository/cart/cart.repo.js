export default class CartRepository {
  constructor(dao) {
    this.dao = dao;
  }

  async addCart() {
    return await this.dao.addCart();
  }

  async getCartByID(id) {
    return await this.dao.getCartByID(id);
  }

  async updateCart(id, cart) {
    return await this.dao.updateCart(id, cart);
  }
}
