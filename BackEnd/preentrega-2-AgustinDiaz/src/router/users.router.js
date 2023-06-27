import { Router } from 'express';
import userService from '../service/user.service.js';
import { comparePassword } from '../../tools/encript.tool.js';
import passport from 'passport';

const userRouter = Router();
userRouter.get('/signin', async (req, res) => {
  res.render('signin', { title: 'SignIn', error: false, errorText: '' });
});
userRouter.get('/signup', async (req, res) => {
  res.render('signup', { title: 'SignUp', error: false, errorText: '' });
});

// userRouter.post('/signup', async (req, res) => {
//   const { userFirstName, userLastName, userEmail, userPassword } = req.body;
//   const userData = {
//     firstName: userFirstName,
//     lastName: userLastName,
//     email: userEmail,
//     password: userPassword,
//   };
//   const user = await userService.addUser(userData);

//   if (user.hasOwnProperty('code')) {
//     if (user.code === 400) {
//       res.render('signup', {
//         title: 'SignUp',
//         error: true,
//         errorText: user.message,
//         userData,
//       });
//     } else {
//       res.status(user.code).json(user.message);
//     }
//   } else {
//     res.status(201).json(user);
//   }
// });

userRouter.post(
  '/signup',
  passport.authenticate('register', {
    failureRedirect: '/users/failedoperation',
  }),
  async (req, res) => {
    res.status(201).json(user);
  }
);

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
      //user.password === userPassword
      if (comparePassword(userPassword, user.password)) {
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

userRouter.get('/failedoperation', async (req, res) => {
  res.send('Failed Operation');
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
