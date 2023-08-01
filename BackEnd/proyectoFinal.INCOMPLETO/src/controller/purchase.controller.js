import { purchasesService } from '../service/purchases.service.js';
import cartController from './cart.controller.js';
import productController from './products.controller.js';

class PurchasesController {
  async addPurchase(cart, user) {
    let { products } = cart;
    console.log(user);
    const { email } = user;
    let amount = 0;
    products.forEach(async (product) => {
      if (product.product.stock >= product.quantity) {
        console.log('Hay stock suficiente');
        amount = amount + product.product.price * product.quantity;
        product.product.stock -= product.quantity;
        await cartController.deleteProductFromCart(
          JSON.stringify(cart._id).split('"')[1],
          JSON.stringify(product.product._id).split('"')[1]
        );

        let response = await productController.updateProduct(
          product.product._id,
          product.product
        );
        console.log('Update producto response: ', response);
      }
    });

    const code = await this.createRandomStringCode();
    return await purchasesService.addPurchase({
      code,
      amount,
      purchaser: email,
    });
  }

  // La posibilidad de que salgan dos codigos iguales es de 0.000000000000000000000002% (1 en 4.7e+21)
  async createRandomStringCode() {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_-+={[}]":;,<>./?|';
    let code = '';
    for (let i = 0; i < 19; i++) {
      code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return code;
  }
}

export const purchasesController = new PurchasesController();
