import CartRepository from './cart.repo.js';
import _DAO from '../../factory.js';

export const cartService = new CartRepository(_DAO.cartDAO);
