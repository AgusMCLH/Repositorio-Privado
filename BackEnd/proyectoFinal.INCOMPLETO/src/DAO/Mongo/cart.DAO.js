import { cartModel } from './../../models/cart.model.js';
import { logger } from './../../middleware/logger.middleware.js';

class CartDAO {
  constructor() {
    this.model = cartModel;
  }
  async addCart() {
    try {
      const cart = await this.model.create({});
      return {
        code: 201,
        msg: `El cart fue agregado con el id: ${cart._id}`,
        cartId: cart._id,
      };
    } catch (error) {
      logger.error('Error al agregar cart', error);
      return { code: 500, msg: `Error al agregar cart: ${error}` };
    }
  }

  async getCartByID(id) {
    try {
      logger.debug(`Buscando carrito con id ${id} desde el DAO`);
      const cartJSON = await this.model
        .findById(id)
        .populate('products.product')
        .lean();
      if (cartJSON.length === 0) {
        return {
          code: 400,
          msg: `No existe ningun carrito con el id ${id}`,
        };
      }
      logger.debug(`Carrito encontrado: ${cartJSON}`);
      return cartJSON;
    } catch (error) {
      if (error.name === 'CastError') {
        return {
          code: 400,
          msg: `No existe ningun carrito con el id ${id}`,
        };
      } else {
        logger.error(error);
      }
    }
  }

  async updateCart(id, cart) {
    try {
      //consigo el cart desde la Base de Datos
      const cartDB = await this.model.findById(id);
      //Igualo los productos de la base de datos con los productos del carrito que me pasaron
      cartDB.products = cart.products;
      //actualizo el carrito en la base de datos
      await cartDB.save();
      return {
        code: 200,
        msg: `Se actualizo el carrito ${id}`,
      };
    } catch (error) {
      logger.error(error);
    }
  }
}

export const cartDAO = new CartDAO();
