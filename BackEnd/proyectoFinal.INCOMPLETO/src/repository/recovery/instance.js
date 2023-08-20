import RecoveryRepository from './recovery.repo.js';
import _DAO from '../../factory.js';

export const recoveryService = new RecoveryRepository(_DAO.recoveryDAO);
