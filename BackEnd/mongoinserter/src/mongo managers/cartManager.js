import { cartModel } from '../models/cart.model.js';
import { productManager } from './productManager.js';

class Cart {
  async addCart() {
    try {
      const cart = await cartModel.create({});
      return {
        code: 201,
        msg: `El cart fue agregado con el id: ${cart._id}`,
      };
    } catch (error) {
      console.log('Error al agregar cart', error);
      return { code: 500, msg: `Error al agregar cart: ${error}` };
    }
  }

  async getCartByID(id) {
    try {
      const cartJSON = await cartModel
        .find({ _id: id })
        .populate('products.product');
      return JSON.stringify(cartJSON, null, '\t');
    } catch (error) {
      if (error.name === 'CastError') {
        return {
          code: 400,
          msg: `No existe ningun carrito con el id ${id}`,
        };
      }

      console.log(JSON.stringify(error));
    }
  }

  async addProductToCart(id, product) {
    if (id === undefined || product === undefined) {
      return {
        code: 400,
        msg: `Error al agregar producto al carrito: faltan datos`,
      };
    }
    if ((await this.getCartByID(id)).code === 400) {
      return { code: 400, msg: `No existe ningun carrito con el id ${id}` };
    }
    if ((await productManager.getProductById(product)).code === 400) {
      return {
        code: 400,
        msg: `No existe ningun producto con el id ${product}`,
      };
    }
    const cart = await cartModel.findById(id);
    cart.products.push({ product });
    console.log(await cart.save());
    return 0;
  }
}

export const cartManager = new Cart();
