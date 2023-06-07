import { productModel } from '../models/product.model.js';

class Product {
  async addProducts({
    title,
    description,
    price,
    thumbnail,
    code,
    stock,
    visible,
  }) {
    try {
      if (
        title === undefined ||
        typeof title !== 'string' ||
        description === undefined ||
        typeof title !== 'string' ||
        price === undefined ||
        typeof price !== 'number' ||
        code === undefined ||
        typeof code !== 'string' ||
        stock === undefined ||
        typeof stock !== 'number'
      ) {
        //Si alguno de los campos esta vacio el sistema se lo hace saber al usuario
        return {
          code: 400,
          msg: `El producto no fue ingresado - Algun campo esta vacio`,
        };
      }
      const data = await productModel.create({
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
        visible,
      });

      return {
        code: 201,
        msg: `el producto fue agregado correctamente con el id: ${data._id}`,
      };
    } catch (error) {
      if (error.code === 11000) {
        return {
          code: 400,
          msg: `El producto no fue ingresado - El codigo es duplicado`,
        };
      }

      console.log(error);
    }
  }

  async getProducts() {
    try {
      const data = await productModel.find();

      return data;
    } catch (error) {
      return {
        code: 500,
        msg: `Error de servidor - ${error}`,
      };
    }
  }
  async getProductById(id) {
    try {
      const data = await productModel.findById(id);
      if (data == null) {
        return {
          code: 400,
          msg: `No existe un producto con el id ${id}`,
        };
      }
      return data;
    } catch (error) {
      return {
        code: 500,
        msg: `Error de servidor - ${error}`,
      };
    }
  }

  async updateProduct(
    idAEditar,
    { title, description, price, thumbnail, code, visible, stock }
  ) {
    if (
      visible === undefined ||
      typeof visible !== 'boolean' ||
      title === undefined ||
      typeof title !== 'string' ||
      description === undefined ||
      typeof description !== 'string' ||
      price === undefined ||
      typeof price !== 'number' ||
      code === undefined ||
      typeof code !== 'string' ||
      stock === undefined ||
      typeof stock !== 'number'
    ) {
      //Si alguno de los campos esta vacio el sistema se lo hace saber al usuario
      return {
        code: 400,
        msg: `El producto con el id "${idAEditar}" no fue actualizado - Algun campo esta vacio o en un formato incorrecto`,
      };
    }
    try {
      const data = await productModel.findByIdAndUpdate(idAEditar, {
        title,
        description,
        price,
        thumbnail,
        code,
        visible,
        stock,
      });
      if (data == null) {
        return {
          code: 400,
          msg: `No existe un producto con el id ${idAEditar}`,
        };
      }
      return {
        code: 200,
        msg: `El producto con el id ${idAEditar} fue actualizado correctamente`,
      };
    } catch (error) {
      console.log(error);
    }
  }

  async deleteProduct(id) {
    try {
      const data = await productModel.findByIdAndDelete(id);
      console.log(data);
      return {
        code: 200,
        msg: `El producto con el id ${id} fue elminado correctamente.`,
      };
    } catch (error) {
      console.log('Error al eliminar producto', error);
    }
  }
}

export const productManager = new Product();
