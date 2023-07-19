import { Router } from 'express';
import passport from 'passport';
import { isGuest } from '../middleware/isGuest.middleware.js';

const userRouter = Router();
userRouter.get('/signin', isGuest, async (req, res) => {
  let error = false;
  let errorText = [];

  if (req.session.messages !== undefined) {
    errorText = req.session.messages[0];
  }
  if (errorText !== undefined && errorText.length > 0) {
    error = true;
  }
  req.session.messages = [];
  res.render('signin', { title: 'SignIn', error, errorText });
});

userRouter.get('/signup', async (req, res) => {
  let error = false;
  let errorText = [];
  if (req.session.messages !== undefined) {
    errorText = req.session.messages[0];
  }
  if (errorText !== undefined) {
    error = true;
  }
  req.session.messages = [];
  res.render('signup', { title: 'SignUp', error, errorText });
});

userRouter.post(
  '/signup',
  passport.authenticate('register', {
    failureRedirect: '/users/signup',
    failureMessage: true,
  }),
  async (req, res) => {
    res.status(201).redirect('/users/signin');
  }
);

userRouter.get(
  '/signin/github',
  passport.authenticate('github', { scope: ['user:email'] }),
  async (req, res) => {}
);

userRouter.get(
  '/signin/githubcallback',
  passport.authenticate('github', { failureRedirect: '/users/signin' }),
  async (req, res) => {
    req.session.user = req.user;
    res.redirect('/users/saludo');
  }
);

userRouter.post(
  '/signin',
  passport.authenticate('signin', {
    failureRedirect: '/users/signin',
    failureMessage: true,
  }),
  (req, res) => {
    const user = req.user;
    delete user.password;
    req.session.user = user;
    res.redirect('/users/saludo');
  }
);

userRouter.get('/logout', async (req, res) => {
  req.session.destroy();
  res.clearCookie('cartId').redirect('/users/signin');
});

userRouter.get('/saludo', async (req, res) => {
  const user = await req.session.user;
  if (user === undefined) {
    setTimeout(() => {
      res.redirect('/users/saludo');
    }, 1000);
  }
  console.log(user);
  res
    .cookie('cartId', user.cartId, {
      maxAge: 10000000,
      signed: true,
    })
    .render('saludo', { title: `Hola ${user.firstName}`, user });
});
userRouter.get('/profile', async (req, res) => {
  const user = req.session.user;
  res.render('profile', { title: 'Profile', user });
});

export { userRouter };
