import UserRepository from './user.repo.js';
import _DAO from '../../factory.js';

export const userService = new UserRepository(_DAO.userDAO);
