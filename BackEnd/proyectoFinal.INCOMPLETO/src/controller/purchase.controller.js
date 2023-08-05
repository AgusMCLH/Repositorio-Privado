import { purchasesService } from '../repository/purchases/instance.js';
import cartController from './cart.controller.js';
import productController from './products.controller.js';

class PurchasesController {
  async addPurchase(cart, user) {
    //Recupera los productos del carrito que le pase
    let { products } = cart;
    //recupera el correo del usuario
    const { email } = user;
    //Poner un error si no hay email o products
    //declaro el monto de la compra por defecto en 0
    let amount = 0;

    for (let i = 0; i < products.length; i++) {
      if (products[i].product.stock >= products[i].quantity) {
        amount = amount + products[i].product.price * products[i].quantity;

        products[i].product.stock -= products[i].quantity;

        await cartController.deleteProductFromCart(
          JSON.stringify(cart._id).split('"')[1],
          JSON.stringify(products[i].product._id).split('"')[1]
        );
        await productController.updateProduct(
          products[i].product._id,
          products[i].product
        );
      }
    }

    // //recorro los productos del carrito
    // products.forEach(async (product) => {
    //   //reviso si hay stock
    //   if (product.product.stock >= product.quantity) {
    //     //si hay stock, sumo el precio del producto por la cantidad al monto total
    //     amount = amount + product.product.price * product.quantity;
    //     //resto la cantidad de productos comprados al stock del producto
    //     product.product.stock -= product.quantity;
    //     //ejecuto el metodo deleteProductFromCart del cartController para borrar el producto del carrito
    //     await cartController.deleteProductFromCart(
    //       //del carrito que le pase recupero su id
    //       JSON.stringify(cart._id).split('"')[1],
    //       //del producto del recorrido recupero su id
    //       JSON.stringify(product.product._id).split('"')[1]
    //     );
    //     //actualizo el producto en la base de datos con el nuvo stock
    //     await productController.updateProduct(
    //       product.product._id,
    //       product.product
    //     );
    //   }
    // });
    //genero un code para la compra
    const code = await this.createRandomStringCode();

    //devuelvo el resultado de la ejecucion del metodo addPurchase del purchasesService
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
