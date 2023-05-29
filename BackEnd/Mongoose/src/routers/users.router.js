import { Router } from 'express';
import userService from '../service/user.service.js';

const usersRouter = Router();

usersRouter.get('/', async (req, res) => {
  try {
    const users = await userService.getAll();
    res.send(users);
  } catch (error) {
    res.status(500).send('Error para obtener todos los usuarios');
  }
  res.send('Hola desde users router');
});

usersRouter.post('/', async (req, res) => {
  try {
    const user = await userService.addUser(req.body);
    res.status(201).send(user);
  } catch (error) {
    res.status(500).send('Error para agregar un usuario');
  }
});
usersRouter.put('/:uid', async (req, res) => {
  const uid = req.params.uid;
  try {
    const user = await userService.updateUser(uid, req.body);
    res.status(201).send(user);
  } catch (error) {
    res.status(500).send('Error para actualizar un usuario');
  }
});

export default usersRouter;
