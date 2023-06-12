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
        console.log('cart:', cart);
        cart.products.forEach((_product) => {
          if (JSON.stringify(_product.product) == JSON.stringify(product)) {
            _product.quantity += 1;
          }
        });
        console.log('cart2:', cart);
        // await cartModel.updateOne(cart);
        await cart.save();
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

  async deleteProductFromCart(id, product) {
    if (id === undefined || product === undefined) {
      return {
        code: 400,
        msg: `Error al eliminar producto del carrito: faltan datos`,
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
    let index = { found: false, num: 0 };
    cart.products.forEach((_product) => {
      if (JSON.stringify(_product.product) == JSON.stringify(product)) {
        console.log('encontrado', index.num);
        index.found = true;
        return;
      } else {
        index.num += 1;
      }
    });
    if (!index.found) {
      return {
        code: 400,
        msg: `El producto con id ${product} no se encuentra en el carrito ${id}`,
      };
    }
    cart.products.splice(index.num, 1);
    await cart.save();
    return {
      code: 200,
      msg: `El producto con id ${product} se elimino del carrito ${id}`,
    };
  }

  async deleteAllProductsFromCart(id) {
    if (id === undefined) {
      return {
        code: 400,
        msg: `Error al eliminar producto del carrito: faltan datos`,
      };
    }
    if ((await this.getCartByID(id)).code === 400) {
      return { code: 400, msg: `No existe ningun carrito con el id ${id}` };
    }
    const cart = await cartModel.findById(id);
    if (cart == null) {
      return {
        code: 400,
        msg: `No existe ningun carrito con el id ${id}`,
      };
    }
    cart.products = [];
    await cart.save();
    return {
      code: 200,
      msg: `Se eliminaron todos los productos del carrito ${id}`,
    };
  }

  async updateCartProducts(id, products) {
    if (id === undefined || products === undefined) {
      return {
        code: 400,
        msg: `Error al actualizar productos del carrito: faltan datos`,
      };
    }
    if ((await this.getCartByID(id)).code === 400) {
      return { code: 400, msg: `No existe ningun carrito con el id ${id}` };
    }
    const cart = await cartModel.findById(id);
    if (cart == null) {
      return {
        code: 400,
        msg: `No existe ningun carrito con el id ${id}`,
      };
    }
    cart.products = products;
    await cart.save();
    return {
      code: 200,
      msg: `Se actualizaron los productos del carrito ${id}`,
    };
  }

  async editProductQuantity(id, product, quantity) {
    if (id === undefined || product === undefined || quantity === undefined) {
      return {
        code: 400,
        msg: `Error al actualizar productos del carrito: faltan datos`,
      };
    }
    if (quantity <= 0) {
      return {
        code: 400,
        msg: `La cantidad debe ser mayor a 0`,
      };
    }
    if ((await this.getCartByID(id)).code === 400) {
      return { code: 400, msg: `No existe ningun carrito con el id ${id}` };
    }
    const cart = await cartModel.findById(id);
    if (cart == null) {
      return {
        code: 400,
        msg: `No existe ningun carrito con el id ${id}`,
      };
    }
    let index = { found: false, num: 0 };
    cart.products.forEach((_product) => {
      if (JSON.stringify(_product.product) == JSON.stringify(product)) {
        console.log('encontrado', index.num);
        index.found = true;
        return;
      } else {
        index.num += 1;
      }
    });
    if (!index.found) {
      return {
        code: 400,
        msg: `El producto con id ${product} no se encuentra en el carrito ${id}`,
      };
    }
    cart.products[index.num].quantity = quantity;
    await cart.save();
    return {
      code: 200,
      msg: `Se actualizo la cantidad del producto con id ${product} del carrito ${id}`,
    };
  }
}
const CM = new Cart();
export default CM;
