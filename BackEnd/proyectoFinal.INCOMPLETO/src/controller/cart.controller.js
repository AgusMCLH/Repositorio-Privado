import mongoose, { mongo } from 'mongoose';
import CM from '../service/cart.service.js';
import productController from './products.controller.js';

class CartController {
  async addCart() {
    return await CM.addCart();
  }
  async getCartByID(id) {
    if (id.length === 24 || id.length === 12) {
      let cart = await CM.getCartByID(id);
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
  async addProductToCart(cartID, productID, req) {
    if ((await productController.getProductByID(productID, req)).code === 400) {
      return {
        code: 400,
        msg: `No existe ningun producto con el id ${productID}`,
      };
    }
    const cart = await this.getCartByID(cartID);
    if (JSON.stringify(cart).includes(productID)) {
      cart.products.forEach((_product) => {
        if (_product.product._id == productID) {
          _product.quantity += 1;
        }
      });
      await this.updateCart(cartID, cart);
    } else {
      cart.products.push({ product: productID });
      await this.updateCart(cartID, cart);
    }
    return {
      code: 200,
      msg: `El producto con id ${productID} se agrego al carrito ${cartID}`,
    };
  }

  async deleteProductFromCart(id, product, req) {
    // if ((await productController.getProductByID(product, req)).code === 400) {
    //   return {
    //     code: 400,
    //     msg: `No existe ningun producto con el id ${product}`,
    //   };
    // }
    const cart = await this.getCartByID(id);

    let realIndex = cart.products.findIndex(
      (_product) => _product.product._id == product
    );
    console.log(realIndex);

    if (realIndex === -1) {
      return {
        code: 400,
        msg: `El producto con id ${product} no se encuentra en el carrito ${id}`,
      };
    }
    cart.products.splice(realIndex, 1);
    return await this.updateCart(id, cart);
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
      return await CM.updateCart(id, cart);
    } else {
      return { code: 400, msg: `Formato de id erroneo` };
    }
  }
}

const cartController = new CartController();
export default cartController;
