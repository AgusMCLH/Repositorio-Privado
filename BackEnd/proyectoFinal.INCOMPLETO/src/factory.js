import mongoose from 'mongoose';
import config from './config/config.js';
import { productDAO } from './DAO/Mongo/products.DAO.js';

let _DAO = {};
switch (config.PERSISTANCEMODULE) {
  case 'MONGO-DB':
    mongoose.connect(config.MONGOURL);

    let { cartDAO } = await import('./DAO/Mongo/cart.DAO.js');
    let { purchasesDAO } = await import('./DAO/Mongo/purchases.DAO.js');
    let { recoveryDAO } = await import('./DAO/Mongo/recovery.DAO.js');
    let { userDAO } = await import('./DAO/Mongo/user.DAO.js');

    let DAO = {
      cartDAO,
      purchasesDAO,
      productDAO,
      recoveryDAO,
      userDAO,
    };
    _DAO = DAO;

    break;
}

export default _DAO;
