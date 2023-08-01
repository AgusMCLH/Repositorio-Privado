import { cartModel } from './../models/cart.model.js';

class Cart {
  async addCart() {
    try {
      const cart = await cartModel.create({});
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
      const cartJSON = await cartModel
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
      const cartDB = await cartModel.findById(id);

      cartDB.products = cart.products;
      await cartDB.save();
      return {
        code: 200,
        msg: `Se actualizo el carrito ${id}`,
      };
    } catch (error) {
      console.log(error);
    }
  }
}
const CM = new Cart();
export default CM;
