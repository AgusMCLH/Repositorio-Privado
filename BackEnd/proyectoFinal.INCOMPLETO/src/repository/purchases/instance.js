import PurchasesRepository from './purchases.repo.js';
import _DAO from '../../factory.js';

export const purchasesService = new PurchasesRepository(_DAO.purchasesDAO);
