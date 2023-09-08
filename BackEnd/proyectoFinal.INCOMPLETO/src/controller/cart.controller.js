import { logger } from '../middleware/logger.middleware.js';
import { cartService } from '../repository/cart/instance.js';
import productController from './products.controller.js';

class CartController {
  async addCart() {
    return await cartService.addCart();
  }
  async getCartByID(id) {
    if (id.length === 24 || id.length === 12) {
      let cart = await cartService.getCartByID(id);
      cart.products.forEach((product) => {
        if (product.product.thumbnail[0] === 'Sin foto') {
          product.product.hasPhoto = false;
        } else {
          product.product.hasPhoto = true;
        }
      });
      cart.productsQuantity = cart.products.length > 0;
      return cart;
    } else {
      return { code: 400, msg: `Formato de id erroneo` };
    }
  }
  async addProductToCart({ c_id, p_id, req }) {
    if ((await productController.getProductByID(p_id, req)).code === 400) {
      return {
        code: 400,
        msg: `No existe ningun producto con el id ${p_id}`,
      };
    }
    const cart = await this.getCartByID(c_id);
    if (JSON.stringify(cart).includes(p_id)) {
      cart.products.forEach((_product) => {
        if (_product.product._id == p_id) {
          _product.quantity += 1;
        }
      });
      await this.updateCart(c_id, cart);
    } else {
      cart.products.push({ product: p_id });
      await this.updateCart(c_id, cart);
    }
    return {
      code: 200,
      msg: `El producto con id ${p_id} se agrego al carrito ${c_id}`,
    };
  }

  async deleteProductFromCart(id, product) {
    //Consigo el carrito
    logger.debug(`Buscando carrito con id ${id} desde el controlador`);
    const cart = await this.getCartByID(id);

    //Busco el producto en el carrito por su id y me quedo con su index
    let realIndex = cart.products.findIndex(
      (_product) => _product.product._id == product
    );
    //si el producto no esta en el carrito, devuelvo un error
    if (realIndex === -1) {
      return {
        code: 400,
        msg: `El producto con id ${product} no se encuentra en el carrito ${id}`,
      };
    }

    //si el producto esta en el carrito, lo borro
    cart.products.splice(realIndex, 1);

    //actualizo el carrito
    let response = await this.updateCart(id, cart);
    return response;
  }

  async deleteAllProductsFromCart(id) {
    const cart = await this.getCartByID(id);
    cart.products = [];
    return await this.updateCart(id, cart);
  }

  async updateCart(id, cart) {
    if (id === undefined || cart === undefined) {
      return {
        code: 400,
        msg: `Error al actualizar carrito: faltan datos`,
      };
    }

    if (
      !cart.hasOwnProperty('products') ||
      !cart.hasOwnProperty('__v') ||
      !cart.hasOwnProperty('_id')
    ) {
      return {
        code: 400,
        msg: `Error al actualizar carrito: faltan datos`,
      };
    }

    if ((await this.getCartByID(id)).code === 400) {
      return { code: 400, msg: `No existe ningun carrito con el id ${id}` };
    }

    if (id.length === 24 || id.length === 12) {
      return await cartService.updateCart(id, cart);
    } else {
      return { code: 400, msg: `Formato de id erroneo` };
    }
  }
}

const cartController = new CartController();
export default cartController;
