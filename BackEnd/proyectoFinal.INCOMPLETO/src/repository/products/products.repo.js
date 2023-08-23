export default class ProductRepository {
  constructor(dao) {
    this.dao = dao;
  }
  async addProducts(product) {
    return await this.dao.addProducts(product);
  }

  async getProducts(limit, page, sort, query) {
    return await this.dao.getProducts(limit, page, sort, query);
  }

  async getAllProducts() {
    return await this.dao.getAllProducts();
  }

  async getProductByID(id) {
    return await this.dao.getProductByID(id);
  }
  async updateProduct(id, product) {
    return await this.dao.updateProduct(id, product);
  }

  async deleteProduct(id) {
    return await this.dao.deleteProduct(id);
  }
  async getProductByOwner(owner) {
    return await this.dao.getProductsByOwner(owner);
  }
}
