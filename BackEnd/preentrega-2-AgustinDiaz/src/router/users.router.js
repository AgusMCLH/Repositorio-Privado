import { Router } from 'express';
import userService from '../service/user.service.js';
import { set } from 'mongoose';

const userRouter = Router();
userRouter.get('/signin', async (req, res) => {
  res.render('signin', { title: 'SignIn', error: false, errorText: '' });
});
userRouter.get('/signup', async (req, res) => {
  res.render('signup', { title: 'SignUp', error: false, errorText: '' });
});

userRouter.post('/signup', async (req, res) => {
  const { userFirstName, userLastName, userEmail, userPassword } = req.body;
  const userData = {
    firstName: userFirstName,
    lastName: userLastName,
    email: userEmail,
    password: userPassword,
  };
  const user = await userService.addUser(userData);
  console.log('user', user);
  if (user.hasOwnProperty('code')) {
    if (user.code === 400) {
      res.render('signup', {
        title: 'SignUp',
        error: true,
        errorText: user.message,
        userData,
      });
    } else {
      res.status(user.code).json(user.message);
    }
  } else {
    res.status(201).json(user);
  }
});

userRouter.post('/signin', async (req, res) => {
  const { userEmail, userPassword } = req.body;
  if (
    userEmail === 'adminCoder@coder.com' ||
    userPassword === 'adminCod3r123'
  ) {
    const user = {
      firstName: 'CODER',
      lastName: 'ADMIN',
      email: userEmail,
      password: userPassword,
      role: 'administrador',
    };
    req.session.user = user;
    res.redirect('/users/saludo');
  } else {
    const user = await userService.getUserByEmail(userEmail);
    if (user) {
      if (user.password === userPassword) {
        req.session.user = user;
        console.log(user);
        res.redirect('/users/saludo');
      } else {
        res.render('signin', {
          title: 'SignIn',
          error: true,
          errorText: 'Contraseña Incorrecta',
          userData: { email: userEmail },
        });
      }
    } else {
      res.render('signin', {
        title: 'SignIn',
        error: true,
        errorText: 'Usuario Inexistente',
        userData: { email: userEmail },
      });
    }
  }
});

userRouter.get('/logout', async (req, res) => {
  req.session.destroy();
  res.redirect('/users/signin');
});

userRouter.get('/saludo', async (req, res) => {
  const user = req.session.user;
  res.render('saludo', { title: `Hola ${user.firstName}`, user });
});
userRouter.get('/profile', async (req, res) => {
  const user = req.session.user;
  res.render('profile', { title: 'Profile', user });
});

export { userRouter };
