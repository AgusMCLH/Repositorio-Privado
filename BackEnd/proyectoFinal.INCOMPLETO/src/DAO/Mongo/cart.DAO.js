import { cartModel } from './../../models/cart.model.js';

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
      console.log('Error al agregar cart', error);
      return { code: 500, msg: `Error al agregar cart: ${error}` };
    }
  }

  async getCartByID(id) {
    try {
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
      return cartJSON;
    } catch (error) {
      if (error.name === 'CastError') {
        return {
          code: 400,
          msg: `No existe ningun carrito con el id ${id}`,
        };
      }
    }
  }

  async updateCart(id, cart) {
    try {
      console.log('\n\npost cart:', JSON.stringify(cart));
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
      console.log('\n\nderiva pa aca');
      console.log(error);
    }
  }
}

export const cartDAO = new CartDAO();
