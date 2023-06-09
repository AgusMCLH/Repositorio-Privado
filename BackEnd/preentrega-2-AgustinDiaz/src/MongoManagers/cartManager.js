import mongoose from 'mongoose';
import { cartModel } from './../models/cart.model.js';
import productManager from './productManager.js';

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
    }
  }

  async addProductToCart(id, product) {
    console.log(id.length);
    if (product.length === 24 || product.length === 12) {
      if (id === undefined || product === undefined) {
        return {
          code: 400,
          msg: `Error al agregar producto al carrito: faltan datos`,
        };
      }
      if ((await this.getCartByID(id)).code === 400) {
        return { code: 400, msg: `No existe ningun carrito con el id ${id}` };
      }
      if ((await productManager.getProductByID(product)).code === 400) {
        return {
          code: 400,
          msg: `No existe ningun producto con el id ${product}`,
        };
      }
      const cart = await cartModel.findById(id);
      if (cart == null) {
        return {
          code: 400,
          msg: `No existe ningun carrito con el id ${id}`,
        };
      }

      if (JSON.stringify(cart).includes(product)) {
        const cartEditado = await cartModel.aggregate([
          {
            $match: {
              'products.product': new mongoose.Types.ObjectId(product),
            },
          },
        ]);

        cartEditado[0].products.forEach((_product) => {
          if (JSON.stringify(_product.product) == JSON.stringify(product)) {
            _product.quantity += 1;
          }
        });
        console.log('cart:', JSON.stringify(cartEditado));
        await cartModel.updateOne(cartEditado[0]);
      } else {
        cart.products.push({ product });
        await cart.save();
      }

      return {
        code: 200,
        msg: `El producto con id ${product} se agrego al carrito ${id}`,
      };
    } else {
      return { code: 400, msg: `El id ${product} no es valido` };
    }
  }
}
const CM = new Cart();
export default CM;
