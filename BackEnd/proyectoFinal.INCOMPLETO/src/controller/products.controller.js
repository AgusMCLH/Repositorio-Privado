import productManager from '../service/products.service.js';

class ProductController {
  async addProduct({
    title,
    description,
    price,
    thumbnail,
    code,
    stock,
    visible,
    category,
  }) {
    if (
      title === undefined ||
      typeof title !== 'string' ||
      description === undefined ||
      typeof description !== 'string' ||
      price === undefined ||
      typeof price !== 'number' ||
      code === undefined ||
      typeof code !== 'string' ||
      stock === undefined ||
      typeof stock !== 'number' ||
      category === undefined ||
      typeof category !== 'string'
    ) {
      //Si alguno de los campos esta vacio el sistema se lo hace saber al usuario
      return {
        code: 400,
        msg: `El producto no fue ingresado - Algun campo esta vacio`,
      };
    }
    let duplicated = false;
    const allProducts = await productManager.getAllProducts();
    allProducts.forEach((product) => {
      if (product.code === code) {
        duplicated = true;
      }
    });
    if (duplicated === true) {
      return {
        code: 400,
        msg: `El producto no fue ingresado - El codigo es duplicado`,
      };
    }
    return await productManager.addProducts({
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
      visible,
      category,
    });
  }

  getStars = () => {
    const getRandomInt = (min, max) => {
      return Math.floor(Math.random() * (max - min)) + min;
    };
    let stars = [];
    let punctuations = getRandomInt(0, 10);
    while (punctuations > 1) {
      stars.push(true);
      punctuations -= 2;
    }
    if (punctuations === 1) {
      stars.push(false);
      punctuations -= 1;
    }
    return stars;
  };

  async getProducts(limit = 10, page = 1, sort = false, query) {
    if (query === undefined) {
      query = { visible: true };
    } else {
      query = JSON.parse(query);
    }
    query.visible = true;
    let products = await productManager.getProducts(limit, page, sort, query);
    const status = () => {
      if (products.docs === undefined) {
        return 'Error';
      } else {
        return 'success';
      }
    };
    products.docs.forEach((product) => {
      if (product.thumbnail[0] === 'Sin foto') {
        product.hasThumbnail = false;
      } else {
        product.hasThumbnail = true;
      }
      product.rating = this.getStars();
    });
    let response = {
      status: status(),
      payload: products.docs,
      totalPages: products.totalPages,
      prevPage: products.prevPage,
      nextPage: products.nextPage,
      page: products.page,
      hasPrevPage: products.hasPrevPage,
      hasNextPage: products.hasNextPage,
      prevLink: `?limit=${products.limit}&page=${products.page - 1}`,
      nextLink: `?limit=${products.limit}&page=${products.page + 1}`,
      firstLink: `?limit=${products.limit}&page=1`,
      lastLink: `?limit=${products.limit}&page=${products.totalPages}`,
    };
    return response;
  }

  async getProductByID(id, req) {
    let product = {};
    product.product = await productManager.getProductByID(id);
    console.log('product code err', product.product.code);
    if (product.product.msg !== undefined) {
      return {
        code: 400,
        msg: `No existe un producto con el id ${id}`,
      };
    }
    product.hasImages = product.product.thumbnail[0] !== 'Sin foto';
    product.product.rating = this.getStars();
    if (req.session.user) {
      const cartId = req.signedCookies.cartId;
      product.AddtoCartURL = `/api/carts/${cartId}/product/${id}`;
    } else {
      product.AddtoCartURL = false;
    }
    return product;
  }

  async updateProduct(
    idAEditar,
    { title, description, price, thumbnail, code, visible, stock, category }
  ) {
    if (
      visible === undefined ||
      typeof visible !== 'boolean' ||
      title === undefined ||
      typeof title !== 'string' ||
      description === undefined ||
      typeof description !== 'string' ||
      price === undefined ||
      typeof price !== 'number' ||
      code === undefined ||
      typeof code !== 'string' ||
      stock === undefined ||
      typeof stock !== 'number' ||
      category === undefined ||
      typeof category !== 'string'
    ) {
      return {
        code: 400,
        msg: `El producto con el id "${idAEditar}" no fue actualizado - Algun campo esta vacio o en un formato incorrecto`,
      };
    }
    let duplicated = false;
    const allProducts = await productManager.getAllProducts();
    allProducts.forEach((product) => {
      if (product.code === code) {
        duplicated = true;
      }
    });
    if (duplicated === true) {
      return {
        code: 400,
        msg: `El producto no fue actualizado - El codigo es duplicado`,
      };
    }
    return await productManager.updateProduct(idAEditar, {
      title,
      description,
      price,
      thumbnail,
      code,
      visible,
      stock,
      category,
    });
  }
  async deleteProduct(id) {
    return await productManager.deleteProduct(id);
  }
}

const productController = new ProductController();
export default productController;
