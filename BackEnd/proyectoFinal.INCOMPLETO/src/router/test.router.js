import { Router } from 'express';
import CustomErrors from '../utils/tools/CustomErrors.js';
import { generateUserErrorInfo } from '../utils/tools/info.js';
import EErrors from '../utils/tools/EErrors.js';

const testRouter = Router();

let users = [];
testRouter.get('/test', async (req, res) => {
  res.status(200).send({ status: 'Success', payload: users });
});

testRouter.post('/test', async (req, res, next) => {
  try {
    const { name, lastName, email, password } = req.body;

    if (!name || !lastName || !email || !password) {
      CustomErrors.createError(
        'Users Creation Error',
        generateUserErrorInfo({ name, lastName, email }),
        'Error en datos al crear el usuario',
        EErrors.INVALID_TYPE
      );
    }

    users.push({ name, lastName, email, password });
    res.status(201).send({ status: 'Success', payload: users });
  } catch (error) {
    next(error);
  }
});

export { testRouter };
