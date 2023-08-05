import ProductRepository from './products.repo.js';
import _DAO from '../../factory.js';

export const productService = new ProductRepository(_DAO.productDAO);
